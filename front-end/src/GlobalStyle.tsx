import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root{
        --light-grey-color: #B4B4B4;
        --dark-grey-color: #2D2D2D;
        
        --blue-color: #000093;
        --white-color: #FFFFFF;
        --hover-blue-button: #070738;
        --hover-white-button: #C7C7DD;
        --active-blue-button: #212161;
        --active-white-button: #8686A2;
    }
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
    }
    body{
        width: 100vw;
        overflow-x: hidden;
    }
    
    a{
        text-decoration: none !important;
        color: black !important;
    }
    p{
        margin: 0 !important;
    }
    .text-super-bold{
        font-weight: 800;
        font-size: 2rem;
    }
`

export default GlobalStyle
