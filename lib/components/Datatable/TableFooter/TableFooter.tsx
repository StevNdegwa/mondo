import { FC } from "react";
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { TableFootWrapper } from "./styles";

export interface TableFooterProps {
  pagination: {
    goToFirst: () => void;
    goToLast: () => void;
    goToNext: () => void;
    goToPrevious: () => void;
    startRow?: number;
    totalRows?: number;
    endRow?: number;
  };
}

export const TableFooter: FC<TableFooterProps> = ({
  pagination: {
    goToFirst,
    goToLast,
    goToNext,
    goToPrevious,
    startRow,
    totalRows,
    endRow,
  },
}) => {
  return (
    <TableFootWrapper>
      <div>
        {totalRows ?
          `Showing rows from ${startRow} to ${endRow} of ${totalRows} rows` : "-"}{" "}
      </div>
      <div>
        <button onClick={goToFirst} disabled={startRow === 1}>
          <FaAngleDoubleLeft />
        </button>
        <button onClick={goToPrevious} disabled={startRow === 1}>
          <FaAngleLeft />
        </button>
        <button onClick={goToNext} disabled={endRow === totalRows}>
          <FaAngleRight />
        </button>
        <button onClick={goToLast}  disabled={endRow === totalRows}>
          <FaAngleDoubleRight />
        </button>
      </div>
    </TableFootWrapper>
  );
};
