import styled from "styled-components";

export const TableFootWrapper = styled.div`
width:100%;
height:70px;
padding:0.5rem;
line-height:60px;
display:flex;
flex-grow:1;
justify-content:space-between;
font-weight:500;
& button{
  cursor:pointer;
  height:40px;
  line-height:50px;
  width:40px;
  border-radius:50%;
  padding:0 0.5rem;
  margin-right: 10px;
  border:none;
  background-color:hsla(0, 0%, 98%, 0.4);
  cursor:pointer;
  font-size:1.3rem;
  color: #3498DB;
  &:disabled{
    color: hsla(0, 0%, 68%, 0.6);
  }
}
`;