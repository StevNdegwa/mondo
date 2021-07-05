import { useMemo, useState, FC, useCallback, ReactNode, useRef } from "react";
import { useQuery } from "react-query";
import Head from "next/head";
import { AppLayout, Datatable, CityDetails } from "../../lib/components";
import { RowType, columns } from "../../lib/cities";
import { useLazyQuery } from "../../lib/hooks/useLazyQuery";

const Cities: FC<{}> = () => {
  const [api, setApi] = useState<string>("/v1/geo/cities?limit=10&offset=1");
  const selectedCity = useRef<string>("");

  const { data, error } = useQuery(["geo/cities", api], () =>
    fetch(`http://geodb-free-service.wirefreethought.com${api}`, {
      method: "GET",
    }).then((response) => response.json())
  );

  const [loadCityDetails] = useLazyQuery(["/v1/geo/cities"], () =>
    fetch(
      `http://geodb-free-service.wirefreethought.com/v1/geo/cities/${selectedCity.current}`,
      { method: "GET" }
    ).then((response) => response.json())
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
    return data
      ? {
          startRow: data.metadata.currentOffset,
          endRow: data.metadata.currentOffset + 10,
          totalRows: data.metadata.totalCount,
        }
      : {};
  }, [data]);

  const getRowDetails = useCallback(async (data: RowType) => {
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
  }, [loadCityDetails]);

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
