import styled from "styled-components";

export const CountryDetailsWrapper = styled.div`
width: 100%;
padding: 0 2rem;
& a{
    font-style:italic;
}
`
export const Definitions = styled.div`
display: inline-block;
width: 70%;
&>dl{
    margin-left: 20px;
    &>dt{
        font-weight: 600;
        margin-top: 5px;
    }
    &>dd{
        margin-left: 10px;
        margin-bottom: 10px;
    }
}
`;

export const Flag = styled.div`
display: inline-flex;
width: 30%;
justify-content: center;
align-items: center;
& img{
    width:150px;
}
`;