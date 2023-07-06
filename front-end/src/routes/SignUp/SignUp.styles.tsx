import styled from 'styled-components'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

export const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row-reverse;
`
export const Title = styled.h1`
    color: white;
    font-weight: 800;
    font-family: 'Inter', sans-serif;
    z-index: 100;
    @media screen and (max-width: 480px) {
    margin-top: 10px;
    }
`
export const BackgroundImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.60;
    position: absolute;
`
export const Report = styled.div`
    width: 90vw;
    height: 100vh;
    margin: 0 auto;
    margin-top: 10vh;
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
    width: 15vw;
    @media screen and (max-width: 480px) {
    width: 40vw;
    }
`
export const Group = styled(Form.Group)`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`
export const Content = styled(Container)`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
`
export const SubTitle = styled.div`
    font-size: 1.3rem;
    margin-bottom: 20px;
`
export const Bottom = styled.div`
    display: flex;
    align-items: flex-end;
    flex-direction: row-reverse;
    vertical-align: bottom;
    margin-top: 10px;
    margin-right: 50px;
    @media screen and (max-width: 480px) {
    margin-right: 0px;
}
`
export const SubmitBTN = styled(Button)`
    background-color: #616B80;
    border-color: #616B80;
    width: 80px;
    height: 40px;
    border-radius: 5px;
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
export const SignInForm = styled(Form)`
    background-color: white;
    width: 100%;
    height: 70%;
    border-radius: 15px;
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
    gap: 2rem;
    z-index: 100;
    @media screen and (max-width: 480px) {
    height: 90%;
    width: 90%;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 10px;
}
`
export const Colx = styled(Col)`
    display: flex;
    flex-direction: column;
    margin-left: 100px;
    margin-top: 70px;
    @media screen and (max-width: 480px) {
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 30px;
}
`