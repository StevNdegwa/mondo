import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Table = styled.table`
  width: 100%;
  height: calc(100% - 60px);
  max-height: calc(100% - 50px);
  border-collapse: collapse;
  position: relative;
  border-top: 1px solid hsla(0, 0%, 94%, 1);
  & > tbody {
    height: calc(100% - 50px);
    overflow: auto;
  }
  & > thead {
    & > tr > th {
      position: sticky;
      top: 0;
      background-color: hsla(0, 0%, 94%, 1);
      box-shadow: 0px 1px 1px hsla(0, 0%, 87%, 1);
    }
    & > tr {
      height: 50px;
      line-height: 50px;
      color: hsla(0, 0%, 34%, 1);
    }
    @media only screen and (max-width: 730px) {
      display: none;
    }
  }
`;
