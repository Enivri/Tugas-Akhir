import { RootState, useAppSelector } from '@store'
import React, { useEffect, useState } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import {Wrapper, SideBar, IconButton, SideButton, BottomButton, UpperOptions} from './Sidebar.style'
import endpoints from '@constants/routes/admin';

const SidebarComponent = () => {
    const isSidebarOpen = useAppSelector((state: RootState) => state.status.isSidebarOpen)
    const [isDesktop, setIsDesktop] = useState(false)
    const navigate = useNavigate()
    const onClick = () => {
        localStorage.removeItem("credentials");
        navigate(generatePath(endpoints.login))
    }

    useEffect(() => {
        const checkIsDesktop = () => {
            const width = window.innerWidth
            if (width < 480) {
                setIsDesktop(false)
            } else {
                setIsDesktop(true)
            }
        }

        checkIsDesktop()
        window.addEventListener("resize", checkIsDesktop)
        return () => window.removeEventListener("resize", checkIsDesktop)
    }, [])

    return (
        <Wrapper>
            <SideBar className={isDesktop || isSidebarOpen ? "active" : ""}>
                <UpperOptions>
                    <SideButton to="/home">
                        <IconButton className="fa-solid fa-house"></IconButton>
                        Home
                        {/* {isDesktop ? "true" : "false"} */}
                    </SideButton>

                    <SideButton to={generatePath(endpoints.patient)}>
                        <IconButton className="fa-solid fa-hospital-user"></IconButton>
                        Patient
                    </SideButton>
                    
                    <SideButton to={generatePath(endpoints.doctor)}>
                        <IconButton className="fa-solid fa-user-doctor"></IconButton>
                        Doctor
                    </SideButton>

                    <SideButton to={generatePath(endpoints.prediction)}>
                        <IconButton className="fa-solid fa-magnifying-glass-chart"></IconButton>
                        Prediction
                    </SideButton>

                    <SideButton to={generatePath(endpoints.diagnosis)}>
                        <IconButton className="fa-solid fa-stethoscope"></IconButton>
                        Diagnosis
                    </SideButton>

                    <SideButton to={generatePath(endpoints.operation)}>
                        <IconButton className="fa-solid fa-bed-pulse"></IconButton>
                        Operation
                    </SideButton>

                    <SideButton to={generatePath(endpoints.checkup)}>
                        <IconButton className="fa-solid fa-file-medical"></IconButton>
                        Check Up
                    </SideButton>

                </UpperOptions>

                <BottomButton>
                    <IconButton className="fa-solid fa-right-from-bracket" onClick={onClick}></IconButton>
                    Logout
                </BottomButton>
            
            </SideBar>
        </Wrapper>
    )
}

export default SidebarComponent