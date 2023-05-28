import styled from "styled-components";
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

export const Wrapper = styled.div`
    `
export const Navibar = styled(Navbar)`
    background-color: white;
    height: 50px;
    box-shadow: 0px 11px 27px 0px rgba(0,0,0,0.5);
    -webkit-box-shadow: 0px 11px 27px 0px rgba(0,0,0,0.5);
    -moz-box-shadow: 0px 11px 27px 0px rgba(0,0,0,0.5);
    z-index: 1000;
    `
export const Title = styled.p`
    font-size: 1.7rem;
`
export const Welcome = styled(Navbar.Text)`
    font-size: 1.5rem;
`
export const IconTitle = styled.i`
    font-size: 1.5rem;
    margin-left: 10px;
`
export const IconButton = styled.i`
    font-size: 2rem;
    color: #E8EAF0;
`

export const SideButton = styled(Button)`
    background-color: transparent !important;
    border-color: transparent !important;
    color: white !important;
    left: 0%;
    display: none;
    @media screen and (max-width: 480px) {
    display: initial;
    }
`




