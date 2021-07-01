import React, { useCallback } from "react";
import { FC } from "react";
import { Wrapper } from "./styles";
import { DatatableStatuses } from "../index";
import { TableError } from "./TableError";
import { TableLoader } from "./TableLoader";

export interface DatatableStatusProps {
  noOfColumns: number;
  status: DatatableStatuses;
  error?: Error | null;
}

export const DatatableStatus: FC<DatatableStatusProps> = ({
  noOfColumns,
  error,
  status,
}) => {
  const show = useCallback(
    (status: DatatableStatuses, error?: Error | null) => {
      switch (status) {
        case DatatableStatuses.ERROR:
          return <TableError errorMessage={error?.message || ""} />;
        case DatatableStatuses.LOADING:
          return <TableLoader />;
        default:
          return null;
      }
    },
    []
  );

  return (
    <Wrapper>
      <td colSpan={noOfColumns}>{show(status, error)}</td>
    </Wrapper>
  );
};
