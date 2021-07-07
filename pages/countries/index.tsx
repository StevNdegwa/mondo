import { useMemo, useState, FC, ReactNode, useCallback, useRef } from "react";
import { useQuery } from "react-query";
import Head from "next/head";
import { AppLayout, Datatable, CountryDetails } from "../../lib/components";
import { columns, RowType } from "../../lib/countries";
import { useLazyQuery } from "../../lib/hooks";

const Countries: FC<{}> = () => {
  const [api, setApi] = useState<string>("/v1/geo/countries?limit=10&offset=1");
  const selectedCountry = useRef<string>("");

  const { data, error } = useQuery(["geo/countries", api], () =>
    fetch(`/api/countries?api=${api}`, {
      method: "GET",
    }).then((response) => response.json())
  );

  const [loadCountryDetails] = useLazyQuery(["geo/countries/details"], () => {
    return fetch(`/api/countries/details?id=${selectedCountry.current}`, {
      method: "GET",
    }).then((response) => response.json());
  });

  const links = useMemo(() => {
    const links: Record<string, string> = {};

    if (data) {
      if (Array.isArray(data.links)) {
        data.links.forEach(({ rel, href }: { rel: string; href: string }) => {
          links[rel] = href;
        });
      }
    }
    return links;
  }, [data]);

  const metaData = useMemo(() => {
    if (data) {
      let startRow = data.metadata.currentOffset + 1,
        endRow = (startRow + 9) > data.metadata.totalCount ? data.metadata.totalCount : startRow + 9,
        totalRows = data.metadata.totalCount;

      return {
        startRow,
        endRow,
        totalRows,
      };
    } else {
      return {};
    }
  }, [data]);

  const getRowDetails = useCallback(
    async (data: RowType) => {
      selectedCountry.current = data.code as string;

      return new Promise<ReactNode>(async (resolve, reject) => {
        const { data, error, isFetching, ...args } = await loadCountryDetails({
          cancelRefetch: true,
        });

        //capital: "Addis Ababa"
        //code: "ET"
        //currencyCodes: ["ETB"]
        //flagImageUri: "http://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Ethiopia.svg"
        //name: "Ethiopia"
        //numRegions: 11
        //wikiDataId: "Q115" //https://www.wikidata.org/wiki/Q115

        if (error) {
          reject(error);
        }

        if (data) {
          resolve(<CountryDetails data={data?.data} />);
        }
      });
    },
    [loadCountryDetails]
  );

  return (
    <AppLayout>
      <Head>
        <title>Cities list</title>
      </Head>
      <Datatable<RowType>
        columns={columns}
        error={error ? new Error((error as Error).message) : null}
        loading={!data}
        data={data?.data}
        pagination={{
          goToFirst: () => links.first && setApi(links.first),
          goToLast: () => links.last && setApi(links.last),
          goToNext: () => links.next && setApi(links.next),
          goToPrevious: () => links.prev && setApi(links.prev),
          startRow: metaData.startRow,
          endRow: metaData.endRow,
          totalRows: metaData.totalRows,
        }}
        getRowDetails={getRowDetails}
      />
    </AppLayout>
  );
};

Countries.displayName = "Countries";

export default Countries;
