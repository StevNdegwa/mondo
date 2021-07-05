import { ReactNode } from "react";

export interface DataTableColumn<RowType> {
    title: string;
    accessor: keyof RowType | ((row: RowType) => string | number);
}

export type DatatableRowsType<RowType> = Array<{ cells: ReactNode[], data: RowType }>