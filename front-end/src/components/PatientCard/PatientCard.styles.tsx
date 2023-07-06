import styled from "styled-components";
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
    margin-top: 5px;
    margin-bottom: 15px;
    `
export const CodeCard = styled(Link)`
    /* border: 1px solid #616B80;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40vw;
    height: 100px;
    @media screen and (max-width: 480px) {
    width: 90vw;
    } */
    `
export const Content = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
` 
export const Date = styled.div`
    background-color: #616B80;
    color: white;
    height: 30%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 15px 15px 0px 0px;
`  
export const Right = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 25px 0px 25px 50px;
    @media screen and (max-width: 480px) {
        margin: 15px 0px 15px 20px;
    } 
` 
export const Left= styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 25px 50px 25px 0px;
    @media screen and (max-width: 480px) {
        margin: 15px 20px 15px 0px;
    } 
` 
export const Kondisi= styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 70%;
    background-color: #E8EAF0;
    align-items: center;
    justify-content: center;
    gap: 4rem;
    border-radius: 0px 0px 15px 15px;
    @media screen and (max-width: 480px) {
    gap: 2rem;
    }
`     


