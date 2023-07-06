import { RootState, useAppSelector } from '@store'
import React, { useEffect, useState } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import {Wrapper, SideBar, IconButton, SideButton, BottomButton, UpperOptions} from './Sidebar.style'
import endpoints from '@constants/routes/admin';
import { usePermission } from '@hooks/usePermission';

const SidebarComponent = () => {
    const Admin = usePermission("Admin")
    const Doctor = usePermission("Doctor")
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
                    <SideButton to={Admin || Doctor ? generatePath(endpoints.home) : generatePath(endpoints.dashboard) }>
                        <IconButton className="fa-solid fa-house"></IconButton>
                        Dashboard
                    </SideButton>

                    { (Admin || Doctor) &&( 
                        <>
                            <SideButton to={generatePath(endpoints.patient)}>
                                <IconButton className="fa-solid fa-hospital-user"></IconButton>
                                Pasien
                            </SideButton>
                            <SideButton to={generatePath(endpoints.prediction)}>
                                <IconButton className="fa-solid fa-magnifying-glass-chart"></IconButton>
                                Prediksi
                            </SideButton>
                            <SideButton to={generatePath(endpoints.diagnosis)}>
                                <IconButton className="fa-solid fa-stethoscope"></IconButton>
                                Diagnosa
                            </SideButton>

                            <SideButton to={generatePath(endpoints.operation)}>
                                <IconButton className="fa-solid fa-bed-pulse"></IconButton>
                                Operasi
                            </SideButton>

                            <SideButton to={generatePath(endpoints.checkup)}>
                                <IconButton className="fa-solid fa-file-medical"></IconButton>
                                Check Up
                            </SideButton>
                        </>
                    ) }

                    { Admin &&(  
                    <SideButton to={generatePath(endpoints.doctor)}>
                        <IconButton className="fa-solid fa-user-doctor"></IconButton>
                        Dokter
                    </SideButton>
                    ) }

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