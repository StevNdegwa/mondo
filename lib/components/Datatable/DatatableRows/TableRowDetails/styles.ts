import styled from "styled-components";

export const RowDetailsWrapper = styled.div`
width: 90%;
margin: auto;
border-radius: 10px;
box-shadow: 0px 0px 3px hsla(200, 15%, 50%, 1);
background-color:hsla(0, 0%, 98%, 0.4);
backdrop-filter: blur(10px);
`;

export const RowDetailsHeader = styled.header`
height: 40px;
border-bottom: 2px solid #78909c;
font-size: 1.8rem;
display: flex;
justify-content:space-between;
align-items: center;
padding:0 1rem;
color:hsla(200, 15%, 54%, 1);
&>button{
    border:none;
    background-color: hsla(200, 15%, 87%, 1);
    color: inherit;
    padding:0.1rem;
    border-radius:20%;
}
`
export const RowDetailsMain = styled.main`
padding: 0.5rem;
`

export const RowDetailsFooter = styled.footer`
height: 50px;
text-align: right;
padding: 5px 1rem;
`;