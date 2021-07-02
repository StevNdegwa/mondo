import { useState, useEffect } from "react";
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { DataTableColumn } from "../component-types";
import { Wrapper, Table, Tablehead, TableFoot } from "./styles";
import { DatatableStatus } from "./DatatableStatus";
import { DatatableRows } from "./DatatableRows";

export type PaginationType = {
  goToFirst: () => void;
  goToLast: () => void;
  goToNext: () => void;
  goToPrevious: () => void;
  startRow?: number;
  totalRows?: number;
  endRow?: number;
};

export interface DatatableProps<RowsType> {
  columns: Array<DataTableColumn<RowsType>>;
  rows: Array<Array<JSX.Element>>;
  loading?: boolean;
  error: Error | null;
  pagination: PaginationType;
}

export enum DatatableStatuses {
  LOADING = "LOADING",
  ERROR = "ERROR",
  NORMAL = "NORMAL",
}

export function Datatable<RowsType>({
  columns,
  rows,
  loading,
  error,
  pagination: {
    goToFirst,
    goToLast,
    goToNext,
    goToPrevious,
    startRow,
    endRow,
    totalRows,
  },
}: DatatableProps<RowsType>) {
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

  return (
    <Wrapper>
      <Table>
        <Tablehead>
          <tr>
            {columns.map((column: DataTableColumn<RowsType>) => {
              return <th key={column.title}>{column.title}</th>;
            })}
          </tr>
        </Tablehead>
        <tbody>
          {status !== DatatableStatuses.NORMAL ? (
            <DatatableStatus
              status={status}
              noOfColumns={columns.length}
              error={error}
            />
          ) : (
            <DatatableRows rows={rows} columns={columns} />
          )}
        </tbody>
      </Table>
      <TableFoot>
        <div>
          Showing rows from {startRow} to {endRow} of {totalRows} rows{" "}
        </div>
        <div>
          <button onClick={goToFirst}>
            <FaAngleDoubleLeft />
          </button>
          <button onClick={goToPrevious}>
            <FaAngleLeft />
          </button>
          <button onClick={goToNext}>
            <FaAngleRight />
          </button>
          <button onClick={goToLast}>
            <FaAngleDoubleRight />
          </button>
        </div>
      </TableFoot>
    </Wrapper>
  );
}

Datatable.displayName = "Datatable";