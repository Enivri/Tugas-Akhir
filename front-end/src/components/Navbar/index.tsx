import React from 'react'
import Container from 'react-bootstrap/Container';
import {Navibar, Title, Welcome, IconTitle, IconButton, SideButton } from './Navbar.styles'
import Navbar from 'react-bootstrap/Navbar';
import { useAppDispatch } from '@store';
import { statusActions } from '@store/status'


const NavbarComponent = () => {
    const dispatch = useAppDispatch()
    const credentials = JSON.parse(localStorage.getItem("credentials") || "")

    const onClick = () => {
        dispatch(statusActions.setIsSidebarOpen())
    }

    return (
        <Navibar fixed="top">
            <SideButton>
                    <IconButton className="fa-solid fa-bars" onClick={onClick}></IconButton>
            </SideButton>
            <Container>
                <Title>Cataract</Title>
                <IconTitle className="fa-sharp fa-solid fa-eye"></IconTitle>
                <Navbar.Collapse className="justify-content-end">
                    <Welcome>
                        Welcome, <a>{ credentials.name } </a>
                    </Welcome>
                </Navbar.Collapse>
            </Container>
        </Navibar>
    )
}

export default NavbarComponent