import React, { FC } from "react";
import { Alert } from "../../../Alert";

import { Wrapper } from "./styles";

export interface TableErrorProps {
  errorMessage: string;
}

export const TableError: FC<TableErrorProps> = ({ errorMessage }) => {
  return (
    <Wrapper>
      <Alert paint="hsla(360, 100%, 62%, 1)">{errorMessage}</Alert>
    </Wrapper>
  );
};
