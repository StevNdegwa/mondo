import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { AppLayout, Datatable, getTableRows } from "../components";
import { columns, RowType } from "./constants";

const Cities = () => {
  const [api, setApi] = useState<string>("/v1/geo/countries?limit=10&offset=1");

  const { data, error } = useQuery(["geo/countries", api], () =>
    fetch(`http://geodb-free-service.wirefreethought.com${api}`, {
      method: "GET",
    }).then((response) => response.json())
  );

  const rows = useMemo(
    () => getTableRows<RowType>(data?.data || [], columns),
    [data]
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
      <Datatable
        columns={columns}
        error={error ? new Error((error as Error).message) : null}
        loading={!data}
        rows={rows}
        pagination={{
          goToFirst: () => setApi(links.first),
          goToLast: () => setApi(links.last),
          goToNext: () => setApi(links.next),
          goToPrevious: () => setApi(links.previous),
          startRow: metaData.startRow,
          endRow: metaData.endRow,
          totalRows: metaData.totalRows,
        }}
      />
    </AppLayout>
  );
};

export default Cities;
