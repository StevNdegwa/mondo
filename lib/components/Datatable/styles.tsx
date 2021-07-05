import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Table = styled.div`
  overflow: auto;
  width:100%;
  height: calc(100% - 70px);
  scrollbar-width: thin;          /* "auto" or "thin" */
  scrollbar-color: currentColor transparent; 
  &::-webkit-scrollbar {
    width: 5px;               /* width of the entire scrollbar */
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;        /* color of the tracking area */
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: currentColor;    /* color of the scroll thumb */
    border-radius: 2px;       /* roundness of the scroll thumb */
  }
  & > table {
    width: 100%;
    height: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    position: relative;
    border-top: 1px solid hsla(0, 0%, 94%, 1);
    & > tbody {
      height: 100%;
      width: 100%;
      & > tr {
        width: 100%;
      }
    }
    & > thead {
      & > tr > th {
        position: sticky;
        top: 0;
        z-index:400;
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
    & > tbody > tr {
      & > td {
        overflow: hidden;
        white-space: nowrap;
        &[role="article"] {
          background-color: hsla(200, 15%, 80%, 1);
          padding: 1rem;
        }
      }
    }
  }
`;
