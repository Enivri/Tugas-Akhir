import React from 'react'
import Navbar from '@components/Navbar'
import Sidebar from '@components/Sidebar'
import { Wrapper, Content } from './Middleware.styles'
import { Outlet, Navigate } from 'react-router-dom'


const Middleware = () => {
    const credentials = localStorage.getItem("credentials")

    if (credentials) {
        const credentialsJSON = JSON.parse(credentials)
        if (!credentialsJSON) {
            return (<Navigate to="/login" />)
        }

    } else {
        return (<Navigate to="/login" />)
    }
    return (
        <Wrapper>
            <Navbar />
            <Sidebar />
            <Content>
                <Outlet />
            </Content>
        </Wrapper>
    )
}

export default Middleware