import { TableRow } from "./styled";
import { DataTableColumn } from "../../../types";

export interface DatatableRowsProps<RowType> {
  rows: Array<Array<JSX.Element>>;
  columns: Array<DataTableColumn<RowType>>;
}

export function DatatableRows<RowType>({
  rows,
  columns,
}: DatatableRowsProps<RowType>) {
  return (
    <>
      {rows.map((row: Array<JSX.Element>, index: number) => {
        return (
          <TableRow key={index}>
            {row.map((cell: JSX.Element, index: number) => {
              return (
                <td key={index}>
                  <div>
                    <div role="columnheader">
                      {columns[index] && columns[index].title}
                    </div>
                    <div>{cell}</div>
                  </div>
                </td>
              );
            })}
          </TableRow>
        );
      })}
    </>
  );
}
