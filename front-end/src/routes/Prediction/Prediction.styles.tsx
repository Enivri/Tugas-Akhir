import styled from 'styled-components'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const Wrapper = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 90%;
    `
export const Header = styled(Link)`
    font-size: 2rem;
    margin: 30px auto 30px auto;
`
export const IconAction = styled.i`
    font-size: 1rem;
    margin-right: 5px;
    margin-left: 5px;
    color: black;
`
export const AddNew = styled(Link)`
    background-color: #616B80;
    border-color: #616B80;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white !important;
    width: 100px;
    height: 40px;
`
export const Options = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`
export const ActionButton = styled(Link)`
    font-size: 1rem;
    margin-right: 5px;
`
export const Search = styled(Button)`
    margin-left: 20px;
    margin-right: 20px;
    background-color: #616B80;
    border-color: #616B80;
`
export const SearchBar = styled(Form.Group)`
    display: flex;
`
