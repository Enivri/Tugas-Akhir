import React, { } from 'react'
import { Wrapper, Report, ReportTitle, Content, SubTitle, Identity, Pasfoto, SubContent, Titlespace, ImageDiv, Eyes, EyesCard, Description, Titlemargin, SecContent } from './ViewOperation.styles'
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@store';
import { statusActions } from '@store/status';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { parseDate } from '@utils/converter';
import { Operation } from '@models/Operation';
import { GetOperationService } from '@services/viewoperation';
import endpoints from '@constants/routes/admin';
import { usePermission } from '@hooks/usePermission';

type Params = {
    operationId: string
}

const ViewOperation= () => {
    const GetOperation = usePermission("Get Operation")
    const [operation, setOperation] = useState<Operation>({        
            id: 0,
            patient_id: 0,
            doctor_id:0,
            diagnosis_id: 0,
            code: "",
            right_eye_pic: "",
            left_eye_pic: "",
            result:"",
            description:"",
            created_at: "",
            user: undefined,
            doctor: undefined,
            diagnosis: undefined,    
})
    
    const params = useParams<Params>()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    useEffect(() => {
        const fetchData = async () =>{
            try{
                const request = {
                    operationId: params.operationId || "",
                }
                const res = await dispatch(GetOperationService(request)).unwrap()
                if (res) setOperation(res)
                console.log(res)
            } catch(err) {
                dispatch(statusActions.setError((err as Error).message))
            }
        }
        if (GetOperation) {
            fetchData()
        }
    }, [dispatch, GetOperation])

    useEffect(() => {
        if (!GetOperation) {
            const credentials = JSON.parse(localStorage.getItem("credentials") || "")
            const isPatient = credentials.accesses?.some((access: string) => access === "Patient")
            navigate(isPatient ? generatePath(endpoints.dashboard) : generatePath(endpoints.home))
        }
    }, [GetOperation])

    return (
        <Wrapper>
            <Report>
                <ReportTitle>Detail Operasi</ReportTitle>
                <Content>
                    <Identity>
                        <Col>           
                            <SubTitle>
                                Identitas Pasien
                            </SubTitle>
                            
                            <SubContent>
                                <Titlespace>Nama Lengkap </Titlespace>
                                <p>:</p>
                                <p>{ operation?.user?.name }</p>
                            </SubContent>
                            <SubContent>
                                <Titlespace>NIK </Titlespace>
                                <p>:</p>
                                <p>{ operation?.user?.nik }</p>
                            </SubContent>
                            <SubContent>
                                <Titlespace>Tanggal Lahir <br/>(dd/mm/yyyy)</Titlespace>
                                <p>:</p>
                                <p>{ parseDate(operation?.user?.birth_date ?? "") }</p>
                            </SubContent>
                            <SubContent>
                                <Titlespace>Kota</Titlespace>
                                <p>:</p>
                                <p>{ operation?.user?.town }</p>
                            </SubContent>
                            <SubContent>
                                <Titlespace>Jenis kelamin </Titlespace>
                                <p>:</p>
                                <p>{ operation?.user?.gender }</p>
                            </SubContent>
                            <SubContent>
                                <Titlespace>No. Telpon </Titlespace>
                                <p>:</p>
                                <p>{ operation?.user?.phone }</p>
                            </SubContent>
                        </Col>
                        
                        <Col>
                            <SubTitle>
                                    Identitas Doctor
                            </SubTitle>
                                <SubContent>
                                    <Titlespace>Nama Lengkap </Titlespace>
                                    <p>:</p>
                                    <p>{ operation?.doctor?.name }</p>
                                </SubContent>
                                <SubContent>
                                    <Titlespace>Tanggal Lahir <br/>(dd/mm/yyyy)</Titlespace>
                                    <p>:</p>
                                    <p>{ parseDate(operation?.doctor?.birth_date ?? "") }</p>
                                </SubContent>
                                <SubContent>
                                    <Titlespace>Jenis kelamin </Titlespace>
                                    <p>:</p>
                                    <p>{ operation?.doctor?.gender }</p>
                                </SubContent>
                        </Col>
                    </Identity>

                    <Eyes>
                        <EyesCard>
                            <p>Mata Kanan</p>
                            <Pasfoto src={operation?.right_eye_pic} alt="Image eror" />
                        </EyesCard>

                        <EyesCard>
                            <p>Mata Kiri</p>
                            <Pasfoto src={operation?.left_eye_pic} alt="Image eror" />
                        </EyesCard>
                    </Eyes>

                    <SecContent>
                        <Titlemargin>Kode Diagnosa </Titlemargin>
                        <p>:</p>
                        <p>{ operation?.code }</p>
                    </SecContent>

                    <SecContent>
                        <Titlemargin>Hasil</Titlemargin>
                        <p>:</p>
                        <p>{ operation?.result }</p>
                    </SecContent>

                    <Description>
                        <h4>Deskripsi :</h4>
                        <p>{operation?.description}</p>
                    </Description>

                </Content>


            </Report>
        
        </Wrapper>

    )
}

export default ViewOperation