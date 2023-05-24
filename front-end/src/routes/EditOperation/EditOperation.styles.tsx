import {  } from 'react-bootstrap'
import styled from 'styled-components'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';


export const Wrapper = styled.div`
`
export const Title = styled.div`
    font-size: 1.5rem;
    margin-top: 75px;
    margin-bottom: 20px;
    margin-left: 30px;
`
export const Report = styled.div`
    width: 90vw;
    height: 80vh;
    margin: 0 auto;
`
export const ReportTitle = styled.div`
    display: flex;
    font-size: 1.5rem;
    justify-content: center;
    margin-top: 10px;
`
export const Label = styled(Form.Label)`
`
export const Control = styled(Form.Control)`
    width: 20vw;
`
export const Group = styled(Form.Group)`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`
export const Content = styled(Container)`
`
export const Bottom = styled.div`
    display: flex;
    align-items: flex-end;
    flex-direction: row-reverse;
    vertical-align: bottom;
    margin-top: 10px;
`
export const SubmitBTN = styled(Button)`
    background-color: #616B80;
    border-color: #616B80;
    margin-right: 10px;
`
export const CancelBTN = styled(Link)`
    background-color: white;
    border: 1px solid #616B80;
    color: #616B80!important;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    width: 80px;
    height: 40px;
    border-radius: 5px;
`
export const Eye = styled.div`
    display: flex;
`
export const EyeBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 20px;
    margin-right: 30px;
`
export const EyeForm = styled(Form.Control)`
    width: 100px;
    height: 100px;
`
export const GroupEye = styled(Form.Group)`
    margin-bottom: 10px;
`
export const Desc = styled.textarea`
    margin-left: 10px;
    width: 50vw; 
    height: 10vh;
    border-color: #D3D3D3;
    border-radius: 5px; 
`
export const Formx = styled(Form)`
    height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

