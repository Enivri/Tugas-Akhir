import styled from 'styled-components'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const Wrapper = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 50%;
    @media screen and (max-width: 480px) {
    width: 90%;
    }
    `
export const Header = styled(Link)`
    font-size: 2rem;
    margin: 30px auto 30px auto;
`
export const AddNew = styled(Link)`
    background-color: #616B80;
    border-color: #616B80;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white !important;
    width: 120px;
    height: 40px;
`
export const Options = styled.div`
    display: flex;
    width: 100%;
    align-items: flex-end;
    flex-direction: row-reverse;
`
export const SubTitle = styled.div`
    font-size: 25px;
    margin-bottom: 10px;
`
export const SubCode= styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 7px;
`
export const PagePosition = styled.div`
    display: flex;
    align-items: flex-end;
    flex-direction: row-reverse;
    vertical-align: bottom;
`
export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`