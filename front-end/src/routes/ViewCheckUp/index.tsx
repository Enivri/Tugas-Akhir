import React, { } from 'react'
import { Wrapper, Report, ReportTitle, Content, SubTitle, Identity, Pasfoto, SubContent, Titlespace, ImageDiv, Eyes, EyesCard, Description, Titlemargin, SecContent } from './ViewCheckUp.styles'
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@store';
import { statusActions } from '@store/status';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { parseDate } from '@utils/converter';
import { GetCheckUpService } from '@services/viewcheckup';
import { CheckUp } from '@models/CheckUp';
import endpoints from '@constants/routes/admin';
import { usePermission } from '@hooks/usePermission';

type Params = {
    checkupId: string
}

const ViewCheckUp= () => {
    const GetCheckUp = usePermission("Get CheckUp")
    const [checkup, setCheckup] = useState<CheckUp>({        
            id: 0,
            patient_id: 0,
            doctor_id:0,
            operation_id: 0,
            right_eye_pic: "",
            left_eye_pic: "",
            description: "",
            created_at: "",
            user: undefined,
            doctor: undefined,
            operation: undefined,
})
    
    const params = useParams<Params>()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    useEffect(() => {
        const fetchData = async () =>{
            try{
                const request = {
                    checkupId: params.checkupId || "",
                }
                const res = await dispatch(GetCheckUpService(request)).unwrap()
                if (res) setCheckup(res)
            } catch(err) {
                dispatch(statusActions.setError((err as Error).message))
            }
        }
        if (GetCheckUp) {
            fetchData()
        }
    }, [dispatch, GetCheckUp])

    useEffect(() => {
        if (!GetCheckUp) {
            const credentials = JSON.parse(localStorage.getItem("credentials") || "")
            const isPatient = credentials.accesses?.some((access: string) => access === "Patient")
            navigate(isPatient ? generatePath(endpoints.dashboard) : generatePath(endpoints.home))
        }
    }, [GetCheckUp])

    return (
        <Wrapper>
            <Report>
                <ReportTitle>Detail Check Up</ReportTitle>
                <Content>
                    <Identity>
                        <Col>           
                            <SubTitle>
                                Identitas Pasien
                            </SubTitle>
                            
                            <SubContent>
                                <Titlespace>Nama Lengkap </Titlespace>
                                <p>:</p>
                                <p>{ checkup?.user?.name }</p>
                            </SubContent>
                            <SubContent>
                                <Titlespace>NIK </Titlespace>
                                <p>:</p>
                                <p>{ checkup?.user?.nik }</p>
                            </SubContent>
                            <SubContent>
                                <Titlespace>Tanggal Lahir <br/>(dd/mm/yyyy)</Titlespace>
                                <p>:</p>
                                <p>{ parseDate(checkup?.user?.birth_date ?? "") }</p>
                            </SubContent>
                            <SubContent>
                                <Titlespace>Kota</Titlespace>
                                <p>:</p>
                                <p>{ checkup?.user?.town }</p>
                            </SubContent>
                            <SubContent>
                                <Titlespace>Jenis kelamin </Titlespace>
                                <p>:</p>
                                <p>{ checkup?.user?.gender }</p>
                            </SubContent>
                            <SubContent>
                                <Titlespace>No. Telpon </Titlespace>
                                <p>:</p>
                                <p>{ checkup?.user?.phone }</p>
                            </SubContent>

                        </Col>
                        
                        <Col>
                            <SubTitle>
                                    Identitas Doctor
                            </SubTitle>
                                
                                <SubContent>
                                    <Titlespace>Nama Lengkap </Titlespace>
                                    <p>:</p>
                                    <p>{ checkup?.doctor?.name }</p>
                                </SubContent>
                                <SubContent>
                                    <Titlespace>Tanggal Lahir <br/>(dd/mm/yyyy)</Titlespace>
                                    <p>:</p>
                                    <p>{ parseDate(checkup?.doctor?.birth_date ?? "") }</p>
                                </SubContent>
                                <SubContent>
                                    <Titlespace>Jenis kelamin </Titlespace>
                                    <p>:</p>
                                    <p>{ checkup?.doctor?.gender }</p>
                                </SubContent>
                        </Col>
                    </Identity>

                    <Eyes>
                        <EyesCard>
                            <p>Mata Kanan</p>
                            <Pasfoto src={checkup?.right_eye_pic} alt="Image eror" />
                        </EyesCard>

                        <EyesCard>
                            <p>Mata Kiri</p>
                            <Pasfoto src={checkup?.left_eye_pic} alt="Image eror" />
                        </EyesCard>
                    </Eyes>

                    <SecContent>
                        <Titlemargin>Kode Operasi </Titlemargin>
                        <p>:</p>
                        <p>{ checkup?.operation?.code }</p>
                    </SecContent>


                    <Description>
                        <h4>Deskripsi :</h4>
                        <p>{checkup?.description}</p>
                    </Description>

                </Content>


            </Report>
        
        </Wrapper>

    )
}

export default ViewCheckUp