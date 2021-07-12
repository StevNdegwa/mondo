import { useState, useEffect, useMemo, ReactNode, useRef } from "react";
import { DataTableColumn, DatatableRowsType } from "../../component-types";
import { Wrapper, Table } from "./styles";
import useDatatable from "./useDatatable";
import { DatatableStatus } from "./DatatableStatus";
import { DatatableRows } from "./DatatableRows";
import { TableFooter } from "./TableFooter";

export type PaginationType = {
  goToFirst: () => void;
  goToLast: () => void;
  goToNext: () => void;
  goToPrevious: () => void;
  startRow?: number;
  totalRows?: number;
  endRow?: number;
};

export interface DatatableProps<RowType> {
  columns: Array<DataTableColumn<RowType>>;
  data: RowType[];
  loading?: boolean;
  error: Error | null;
  pagination: PaginationType;
  getRowDetails?: (row: RowType) => Promise<ReactNode>;
}

export enum DatatableStatuses {
  LOADING = "LOADING",
  ERROR = "ERROR",
  NORMAL = "NORMAL",
}

export function Datatable<RowsType>({
  columns,
  data,
  loading,
  error,
  pagination,
  getRowDetails,
}: DatatableProps<RowsType>) {
  const { getTableRows } = useDatatable(columns);

  const rows = useMemo<DatatableRowsType<RowsType>>(
    () => getTableRows(data || []) || [],
    [data, getTableRows]
  );

  const [status, setStatus] = useState<DatatableStatuses>(
    error
      ? DatatableStatuses.ERROR
      : loading
      ? DatatableStatuses.LOADING
      : DatatableStatuses.NORMAL
  );

  useEffect(() => {
    setStatus(
      error
        ? DatatableStatuses.ERROR
        : loading
        ? DatatableStatuses.LOADING
        : !rows.length
        ? DatatableStatuses.ERROR
        : DatatableStatuses.NORMAL
    );
  }, [loading, error, rows]);

  const tableRef = useRef<HTMLTableElement | null>(null);

  return (
    <Wrapper>
      <Table>
        <table ref={tableRef}>
          <thead>
            <tr>
              {columns.map((column: DataTableColumn<RowsType>) => {
                return <th key={column.title}>{column.title}</th>;
              })}
              <th style={{width:"40px"}}/>
            </tr>
          </thead>
          <tbody>
            {status !== DatatableStatuses.NORMAL ? (
              <DatatableStatus
                status={status}
                noOfColumns={columns.length}
                error={error}
              />
            ) : (
              <DatatableRows
                rows={rows}
                columns={columns}
                table={tableRef}
                getRowDetails={getRowDetails}
              />
            )}
          </tbody>
        </table>
      </Table>
      <TableFooter pagination={pagination} />
    </Wrapper>
  );
}

Datatable.displayName = "Datatable";
