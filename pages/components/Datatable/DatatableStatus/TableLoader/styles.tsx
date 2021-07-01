import styled, { keyframes } from "styled-components";

const loadAnim = keyframes`
from{
  transform:rotate(0deg)
}
to{
  transform:rotate(360deg);
}
`;

export const Wrapper = styled.div`
  width: 30px;
  height: 30px;
  border: 10px solid hsla(227, 15%, 82%, 1);
  border-top-color: hsla(227, 45%, 62%, 1);
  border-radius: 50%;
  animation: ${loadAnim} 1s linear infinite;
  margin: 30px auto;
`;
