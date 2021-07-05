import styled from "styled-components";

export const CityDetailsWrapper = styled.div`
width: 100%;
padding: 0 2rem;
& a{
    font-style:italic;
}
`
export const CityDefinitions = styled.div`
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

export const CityFlag = styled.div`
display: inline-flex;
width: 30%;
justify-content: center;
align-items: center;
& img{
    width:150px;
}
`;