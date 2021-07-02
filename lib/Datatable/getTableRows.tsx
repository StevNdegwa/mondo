import { DataTableColumn } from "../component-types";

export function getTableRows<RowsType>(
  data: RowsType[],
  columns: DataTableColumn<RowsType>[]
): JSX.Element[][] {
  let rows = data.map((dataRow: RowsType) => {
    let cells: Array<JSX.Element> = [];

    columns.forEach((column: DataTableColumn<RowsType>) => {
      if (typeof column.accessor === "function") {
        cells.push(<>{column.accessor(dataRow)}</>);
      } else {
        cells.push(<>{dataRow[column.accessor]}</>);
      }
    });

    return cells;
  });

  return rows;
}
