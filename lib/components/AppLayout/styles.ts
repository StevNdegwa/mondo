import styled from "styled-components";

export const AppLayoutWrapper = styled.div`
width: 100vw;
height: 100vh;
padding:2rem;
background-image: linear-gradient(to bottom, #ECEFF1, #90A4AE, #78909C);
color: hsl(200, 18%, 26%);
@media only screen and (max-width:1024px){
    padding: 0px;
}
`;

export const Header = styled.header`
width: 60%;
margin:auto;
height: 80px;
background-color:hsla(0, 0%, 98%, 0.4);
text-align:center;
border-radius:10px;
box-shadow: 0px 0px 8px hsla(0, 0%, 98%, 0.4);
backdrop-filter: blur(10px);
@media only screen and (max-width:1024px){
    width: 100%;
    border-radius:0px;
}
`;

export const Navigation = styled.nav`
height:100%;
display:inline-block;
width:fit-content;
&>ul{
    list-style-type:none;
    height:100%;
    &>li{
        display:inline-block;
        height:100%;
        padding:0 2rem;
        font-weight:600;
        line-height:80px;
    }
}
`;

export const Main = styled.main`
width: calc(100% - 20rem);
height: calc(100% - 140px);
margin:1rem auto;
border-radius:12px;
overflow:hidden;
box-shadow: 0px 0px 8px hsla(0, 0%, 98%, 0.4);
backdrop-filter: blur(10px);
background-color:hsla(0, 0%, 98%, 0.7);
@media only screen and (max-width:1024px){
    padding: 0px;
    width: calc(100% - 2rem);
}
`;

export const Footer = styled.footer`
width: 100%;
height: 40px;
background-color: hsl(210, 29%, 89%);
display:flex;
justify-content:center;
align-items:center;
border-radius:8px;
box-shadow: 0px 0px 2px hsl(210, 29%, 69%);
font-weight:600;
@media only screen and (max-width:1024px){
    border-radius:0;
}
`;