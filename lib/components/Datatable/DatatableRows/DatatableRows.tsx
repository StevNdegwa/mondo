import { ReactNode, useRef, MutableRefObject, useCallback } from "react";
import ReactDOM from "react-dom";
import { TableRow } from "./styled";
import { DataTableColumn, DatatableRowsType } from "../../../component-types";

export interface DatatableRowsProps<RowType> {
  rows: DatatableRowsType<RowType>;
  columns: Array<DataTableColumn<RowType>>;
  table: MutableRefObject<HTMLTableElement | null>;
  getRowDetails?: (row: RowType) => Promise<ReactNode>;
}

export function DatatableRows<RowType>({
  rows,
  columns,
  table,
  getRowDetails,
}: DatatableRowsProps<RowType>) {
  const addedRow = useRef<HTMLTableRowElement | null>(null);

  const handleRowClick = useCallback(
    async (data: RowType, index: number) => {
      try {
        if (getRowDetails) {
          let row = addedRow.current;
          if (table.current) {
            if (row) {
              let dataRowIndex = row.getAttribute("data-row-index");
              table.current.deleteRow(row.rowIndex);
              addedRow.current = null;
              if (dataRowIndex === `${index}`) return;
            }

            let details = await getRowDetails(data);

            row = table.current.insertRow(index);
            row.setAttribute("data-row-index", `${index}`);
            ReactDOM.render(
              <td colSpan={columns.length}>
                <div style={{ width: "100%", padding: "1rem" }}>{details}</div>
              </td>,
              row
            );

            addedRow.current = row;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    [table]
  );

  return (
    <>
      {rows.map(
        (
          { cells, data }: { cells: ReactNode[]; data: RowType },
          index: number
        ) => {
          return (
            <TableRow
              key={index}
              onClick={() => handleRowClick(data, index + 2)}
            >
              {cells.map((cell: ReactNode, index: number) => {
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
        }
      )}
    </>
  );
}
