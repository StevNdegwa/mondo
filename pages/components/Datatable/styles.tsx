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
  over
  & > tbody {
    height: calc(100% - 50px);
    overflow: auto;
  }
`;

export const Tablehead = styled.thead`
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
`;

export const TableFoot = styled.div`
width:100%;
height:60px;
padding: 0 1rem;
line-height:60px;
display:flex;
flex-grow:1;
justify-content:space-between;
font-weight:500;
& button{
  cursor:pointer;
  height:48px;
  width:48px;
  border-radius:50%;
  padding:0 0.5rem;
  margin-right: 10px;
  border:none;
  background-color:hsla(0, 0%, 98%, 0.4);
  cursor:pointer;
  font-size:1.3rem;
  color: #3498DB;
}
`;