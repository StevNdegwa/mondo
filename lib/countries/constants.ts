export type RowType = Record<string, string | number | Array<string | number>>;

export const columns = [
    {
        title: "Name",
        accessor: (row: RowType) => row.name as string,
    },
    {
        title: "Country Code",
        accessor: (row: RowType) => row.code as number,
    },
    {
        title: "Currency codes",
        accessor: (row: RowType) =>
            Array.isArray(row.currencyCodes) ?
                row.currencyCodes.join(", ") :
                String(row.currencyCodes),
    },
];
