import { DataTableColumn } from "../../types";

export type Employees = {
    name: string;
    gender: string;
    role: string;
}

export let employees = [
    { name: "Stephen", gender: "Male", role: "Software Engineer" },
    { name: "Juliet", gender: "Female", role: "Accountant" },
]

export const columns: Array<DataTableColumn<Employees>> = [
    { title: "Name", accessor: "name" },
    { title: "Gender", accessor: "gender" },
    { title: "Job position", accessor: "role" },
    { title: "Description", accessor: (e) => `A ${e.role}` }
]