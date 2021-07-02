import styled from "styled-components";

export const HomeHeader = styled.header`
width:100%;
height: 80px;
`;

export const HomeBody = styled.main`
width:100%;
height: calc(100% - 80px);
display:flex;
justify-content: center;
align-items:center;
& article{
    margin: 20px;
    line-height:38px;
    &>div{
        padding-left: 1rem;
    }
}
`;