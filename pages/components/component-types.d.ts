
export interface DataTableColumn<RowType> {
    title: string;
    accessor: keyof RowType | ((row: RowType) => string | number);
}
  