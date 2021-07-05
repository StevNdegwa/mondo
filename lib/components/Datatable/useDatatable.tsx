import { ReactNode, useCallback } from "react";
import { DataTableColumn, DatatableRowsType } from "../../component-types";

export type PaginationType = {
  goToFirst: () => void;
  goToLast: () => void;
  goToNext: () => void;
  goToPrevious: () => void;
  startRow?: number;
  totalRows?: number;
  endRow?: number;
};

export default function useDatatable<RowType>(
  columns: Array<DataTableColumn<RowType>>
) {
  const getTableRows = useCallback(
    (data: RowType[]): DatatableRowsType<RowType> => {
      return data.map((dataRow: RowType) => {
        let cells: Array<ReactNode> = [];

        columns.forEach((column: DataTableColumn<RowType>) => {
          if (typeof column.accessor === "function") {
            cells.push(column.accessor(dataRow));
          } else {
            cells.push(dataRow[column.accessor]);
          }
        });

        return { cells, data: dataRow };
      });
    },
    [columns]
  );

  return {
    getTableRows,
  };
}
