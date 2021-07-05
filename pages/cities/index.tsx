import { useMemo, useState, FC } from "react";
import { useQuery } from "react-query";
import Head from "next/head";
import { AppLayout, Datatable } from "../../lib/components";
import { RowType, columns } from "../../lib/cities";

const Cities: FC<{}> = () => {
  const [api, setApi] = useState<string>("/v1/geo/cities?limit=10&offset=1");

  const { data, error } = useQuery(["geo/cities", api], () =>
    fetch(`http://geodb-free-service.wirefreethought.com${api}`, {
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
    return data
      ? {
          startRow: data.metadata.currentOffset,
          endRow: data.metadata.currentOffset + 10,
          totalRows: data.metadata.totalCount,
        }
      : {};
  }, [data]);

  return (
    <AppLayout>
      <Head>
        <title>Cities list</title>
      </Head>
      <Datatable<RowType>
        columns={columns}
        error={error ? new Error((error as Error).message) : null}
        loading={!data}
        data={data}
        pagination={{
          goToFirst: () => links.first && setApi(links.first),
          goToLast: () => links.last && setApi(links.last),
          goToNext: () => links.next && setApi(links.next),
          goToPrevious: () => links.prev && setApi(links.prev),
          startRow: metaData.startRow,
          endRow: metaData.endRow,
          totalRows: metaData.totalRows,
        }}
      />
    </AppLayout>
  );
};

Cities.displayName = "Cities";

export default Cities;
