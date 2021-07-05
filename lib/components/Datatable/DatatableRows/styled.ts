import styled from "styled-components";

export const TableRow = styled.tr`
  width: 100%;
  line-height: 48px;
  padding: 0 0.3rem;
  cursor:pointer;
  &:nth-child(even) {
    background-color: hsla(0, 0%, 98%, 0.3);
  }
  &:hover {
    background-color: hsla(0, 0%, 98%, 0.4);
  }
  & > td > div {
    display: flex;
    justify-content: space-between;
    & > div {
      width: 100%;
      padding-left: 1rem;
      text-align:center;
      &[role="columnheader"] {
        font-weight: 600;
        min-width: 120px;
        display: none;
        max-width: 20%;
      }
    }
  }

  @media only screen and (max-width: 730px) {
    & > td {
      width: 100%;
      display: flex;
      & > div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        & > div {
          &[role="columnheader"] {
            display: block;
          }
        }
      }
    }
  }
`;