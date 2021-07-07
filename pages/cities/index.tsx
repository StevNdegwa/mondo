import { useMemo, useState, FC, useCallback, ReactNode, useRef } from "react";
import { useQuery } from "react-query";
import Head from "next/head";
import { AppLayout, Datatable, CityDetails } from "../../lib/components";
import { RowType, columns } from "../../lib/cities";
import { useLazyQuery } from "../../lib/hooks/useLazyQuery";

const Cities: FC<{}> = () => {
  const [api, setApi] = useState<string>("/v1/geo/cities?limit=10&offset=1");
  const selectedCity = useRef<string>("");

  const { data, error } = useQuery(["/v1/geo/cities", api], () =>
    fetch(`/api/cities?api=${api}`, {
      method: "GET",
    }).then((response) => response.json())
  );

  const [loadCityDetails] = useLazyQuery(["/v1/geo/cities/id"], () =>
    fetch(`/api/cities/details?cityId=${selectedCity.current}`, {
      method: "GET",
    }).then((response) => response.json())
  );

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
      selectedCity.current = data.id as string;

      return new Promise<ReactNode>(async (resolve, reject) => {
        const { data, error, isFetching, ...args } = await loadCityDetails({
          cancelRefetch: true,
        });

        //city: "Ajman";
        //country: "United Arab Emirates";
        //countryCode: "AE";
        //id: 638;
        //latitude: 25.399444444;
        //longitude: 55.479722222;
        //name: "Ajman";
        //population: 238119;
        //region: "Ajman Emirate";
        //regionCode: "AJ";
        //type: "CITY";
        //wikiDataId: "Q530171";

        if (error) {
          reject(error);
        }

        if (data) {
          resolve(<CityDetails data={data?.data} />);
        }
      });
    },
    [loadCityDetails]
  );

  console.log(data);

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

Cities.displayName = "Cities";

export default Cities;
