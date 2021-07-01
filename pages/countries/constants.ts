export type RowType = Record<string, string | number>;

export const columns = [
    {
        title: "Name",
        accessor: (row: RowType) => row.name,
    },
    {
        title: "Country Code",
        accessor: (row: RowType) => row.code,
    },
    {
        title: "Currency codes",
        accessor: (row: RowType) => Array.isArray(row.currencyCodes) ? row.currencyCodes.join(", ") : "",
    },
];
