import { useMemo, useState, FC, ReactNode, useCallback, useRef } from "react";
import { useQuery } from "react-query";
import Head from "next/head";
import { AppLayout, Datatable } from "../../lib/components";
import { columns, RowType } from "../../lib/countries";
import { useLazyQuery } from "../../lib/hooks";

import { data } from "./data";

const Countries: FC<{}> = () => {
  const [api, setApi] = useState<string>("/v1/geo/countries?limit=10&offset=1");
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const sc = useRef<string>("");

  /**const { data, error } = useQuery(["geo/countries", api], () =>
    fetch(`http://geodb-free-service.wirefreethought.com${api}`, {
      method: "GET",
    }).then((response) => response.json())
  );**/

  const [loadCountryDetails, { data: lcData, error: lcError, isFetching, ...args }] = useLazyQuery(
    ["geo/countries/details"],
    () => {
      return fetch(
        `http://geodb-free-service.wirefreethought.com/v1/geo/countries/${sc.current}`,
        {
          method: "GET",
        }
      ).then((response) => response.json());
    }
  );

  const error = null;

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

  console.log(isFetching)
  const getRowDetails = useCallback(async (data: RowType) => {
    //const [loading, setLoading] = useState(true);
    
    sc.current = data.code as string;
    const query = loadCountryDetails();

    return (<>
      { isFetching ? <div>Loading</div> : !!lcData ? <section>{lcData.data.name}</section> : <div>No data</div> }
    </>)
  }, [isFetching, lcData]);

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
