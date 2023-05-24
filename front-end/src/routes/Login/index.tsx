import React, { useState } from 'react'
import { Wrapper, BackgroundImage, Content, Title, SignInForm, SignInTitle, SignInButton, Label, TextInput } from './Login.styles'
import Image from '@assets/background.jpg'
import { login } from '@services/login'
import { useAppDispatch } from '@store'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const onChange = (e: Event) => {
        const { name, value } = e.currentTarget as HTMLInputElement
        setForm(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try{
            const res = await dispatch(login(form)).unwrap()

            if (res) localStorage.setItem("credentials", JSON.stringify(res))
            navigate('/home')
        } catch(err) {
            alert(err)
        }
    }

    return (
        <Wrapper>
            <BackgroundImage src={Image} alt="background-logo" />
            <Content>
                <Title>WELCOME!</Title>
                <SignInForm onSubmit={onSubmit}>
                    <SignInTitle>SIGN IN</SignInTitle>
                    <Label controlId="floatingInput" label="Email address" className="mb-3">
                        <TextInput type="email" name="email" placeholder="name@example.com" value={form.email} onChange={onChange} />
                    </Label>
                    <Label controlId="floatingInput" label="Password" className="mb-3">
                        <TextInput type="password" name="password" placeholder="Password" value={form.password} onChange={onChange} />
                    </Label>
                    <SignInButton type="submit" variant="primary">SIGN IN</SignInButton>    
                </SignInForm>
            </Content>
        </Wrapper>
    )
}

export default Login