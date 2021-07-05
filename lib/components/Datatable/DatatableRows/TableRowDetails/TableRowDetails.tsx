import { FC } from "react";
import { FaEllipsisH, FaTimes } from "react-icons/fa";

import {
  RowDetailsFooter,
  RowDetailsWrapper,
  RowDetailsHeader,
  RowDetailsMain,
} from "./styles";

export interface TableRowDetailsProps {
  close: () => void;
}

export const TableRowDetails: FC<TableRowDetailsProps> = ({
  close,
  children,
}) => {
  return (
    <RowDetailsWrapper>
      <RowDetailsHeader>
        <span>
          <FaEllipsisH />
        </span>
        <button onClick={close}>
          <FaTimes />
        </button>
      </RowDetailsHeader>
      <RowDetailsMain>{children}</RowDetailsMain>
      <RowDetailsFooter></RowDetailsFooter>
    </RowDetailsWrapper>
  );
};
