import numeral from "numeral";

export type RowType = Record<string, string | number>;

export const columns = [
    {
        title: "City Name",
        accessor: (row: RowType) => row.city,
    },
    {
        title: "Country",
        accessor: (row: RowType) => row.country,
    },
    {
        title: "Population",
        accessor: (row: RowType) => numeral(row.population).format("0, 0"),
    },
];
