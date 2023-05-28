import styled from 'styled-components'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link } from 'react-router-dom';


export const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row-reverse;
`

export const BackgroundImage = styled.img`
    width: 62.5%;
    height: 100%;
    object-fit: cover;
    opacity: 0.75;
    @media screen and (max-width: 480px) {
        width: 100%;
        position: absolute;
    }
`
export const Content = styled.div`
    width: 37.5%;
    background-color: #616B80;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;

    @media screen and (max-width: 480px) {
    width: 100%;
}
`
export const Title = styled.h1`
    color: white;
    font-weight: 800;
    font-family: 'Inter', sans-serif;
    @media screen and (max-width: 480px) {
    z-index: 100;
}
`
export const SignInForm = styled.form`
    background-color: white;
    width: 70%;
    height: 60%;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    align-items: center;
    @media screen and (max-width: 480px) {
    z-index: 100;
}
`
export const SignInTitle = styled.h2`
    color: #0B56E8;
    font-weight: 800;
    font-family: 'Inter', sans-serif;
`
export const Label = styled(FloatingLabel)`
    width: 70%;
    label{
        color: grey;
    }
`
export const TextInput = styled(Form.Control)``

export const SignInButton = styled(Button)`
    width: 70%;
    padding: 15px 0;
`

export const SignUpButton = styled(Link)`
    color: #616B80!important;
`