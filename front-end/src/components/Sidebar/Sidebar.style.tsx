import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import styled from "styled-components";

export const Wrapper = styled.div`
`  
export const IconTitle = styled.i`
    font-size: 1.5rem;
    padding-left: 10px;
`
export const SideBar = styled.div`
    position: fixed;
    top: 50px;
    left: 0;
    width: 75px;
    height: calc(100vh - 50px);
    background-color: #616B80; 
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    z-index: 1001;
    transition: 0.25s;
    transform: translateX(-100%);

    &.active{
        transform: translateX(0);
    }
`
export const UpperOptions = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
`
export const IconButton = styled.i`
    font-size: 2rem;
    color: white;
`
export const SideButton = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
    border-color: transparent;
    font-size: 0.7rem;
    color: white !important;
    margin-bottom: 10px;
`
export const BottomButton = styled(Button)`
    background-color: transparent;
    border-color: transparent;
    bottom: 0;
    margin-bottom: 20px;
`