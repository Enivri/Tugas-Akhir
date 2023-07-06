import React, { } from 'react'
import { Wrapper, Report, ReportTitle, Content, SubTitle, Identity, Pasfoto, SubContent, Titlespace, Eyes, EyesCard, EyesTitle, EyesBox, Description } from './ViewDiagnosis.styles'
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@store';
import { statusActions } from '@store/status';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { parseDate } from '@utils/converter';
import { GetDiagnosisService } from '@services/viewdiagnosis';
import { Diagnosis } from '@models/Diagnosis';
import endpoints from '@constants/routes/admin';
import { usePermission } from '@hooks/usePermission';

type Params = {
    diagnosisId: string
}

const ViewDiagnosis= () => {
    const GetDiagnosis = usePermission("Get Diagnosis")
    const [diagnosis, setDiagnosis] = useState<Diagnosis>({        
            id: 0,
            patient_id: 0,
            doctor_id:0,
            prediction_id: 0,
            code: "",
            right_eye_pic: "",
            left_eye_pic: "",
            right_eye_cond: "",
            left_eye_cond:"",
            description:"",
            created_at: "",
            user: undefined,
            doctor: undefined,
            prediction: undefined,
})
    
    const params = useParams<Params>()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    useEffect(() => {
        const fetchData = async () =>{
            try{
                const request = {
                    diagnosisId: params.diagnosisId || "",
                }
                const res = await dispatch(GetDiagnosisService(request)).unwrap()
                if (res) setDiagnosis(res)
                console.log(res)
            } catch(err) {
                dispatch(statusActions.setError((err as Error).message))
            }
        }
        if (GetDiagnosis) {
            fetchData()
        }
    }, [dispatch, GetDiagnosis])

    useEffect(() => {
        if (!GetDiagnosis) {
            const credentials = JSON.parse(localStorage.getItem("credentials") || "")
            const isPatient = credentials.accesses?.some((access: string) => access === "Patient")
            navigate(isPatient ? generatePath(endpoints.dashboard) : generatePath(endpoints.home))
        }
    }, [GetDiagnosis])

    return (
        <Wrapper>
            <Report>
                <ReportTitle>Detail Diagnosa</ReportTitle>
                <Content>
                    <Identity>
                        <Col>           
                            <SubTitle>
                                Identitas Pasien
                            </SubTitle>
                            
                            <SubContent>
                                <Titlespace>Nama Lengkap </Titlespace>
                                <p>:</p>
                                <p>{ diagnosis?.user?.name }</p>
                            </SubContent>
                            <SubContent>
                                <Titlespace>NIK </Titlespace>
                                <p>:</p>
                                <p>{ diagnosis?.user?.nik }</p>
                            </SubContent>
                            <SubContent>
                                <Titlespace>Tanggal Lahir <br/>(dd/mm/yyyy)</Titlespace>
                                <p>:</p>
                                <p>{ parseDate(diagnosis?.user?.birth_date ?? "") }</p>
                            </SubContent>
                            <SubContent>
                                <Titlespace>Kota</Titlespace>
                                <p>:</p>
                                <p>{ diagnosis?.user?.town }</p>
                            </SubContent>
                            <SubContent>
                                <Titlespace>Jenis kelamin </Titlespace>
                                <p>:</p>
                                <p>{ diagnosis?.user?.gender }</p>
                            </SubContent>
                            <SubContent>
                                <Titlespace>No. Telpon </Titlespace>
                                <p>:</p>
                                <p>{ diagnosis?.user?.phone }</p>
                            </SubContent>
                        </Col>
                        
                        <Col>
                            <SubTitle>
                                    Identitas Doctor
                            </SubTitle>
                                
                                <SubContent>
                                    <Titlespace>Nama Lengkap </Titlespace>
                                    <p>:</p>
                                    <p>{ diagnosis?.doctor?.name }</p>
                                </SubContent>
                                <SubContent>
                                    <Titlespace>Tanggal Lahir <br/>(dd/mm/yyyy)</Titlespace>
                                    <p>:</p>
                                    <p>{ parseDate(diagnosis?.doctor?.birth_date ?? "") }</p>
                                </SubContent>
                                <SubContent>
                                    <Titlespace>Jenis kelamin </Titlespace>
                                    <p>:</p>
                                    <p>{ diagnosis?.doctor?.gender }</p>
                                </SubContent>
                        </Col>
                    </Identity>

                    <EyesBox>
                        <EyesTitle>
                            <h4>Diagnosa</h4>
                            <Eyes>
                                <EyesCard>
                                    <p>Mata Kanan</p>
                                    <Pasfoto src={diagnosis?.right_eye_pic} alt="Image eror" />
                                    <p>Kondisi: {diagnosis?.right_eye_cond}</p>
                                </EyesCard>

                                <EyesCard>
                                    <p>Mata Kiri</p>
                                    <Pasfoto src={diagnosis?.left_eye_pic} alt="Image eror" />
                                    <p>Kondisi: {diagnosis?.left_eye_cond}</p>
                                </EyesCard>
                            </Eyes>
                        </EyesTitle>

                        <EyesTitle>
                            <h4>Prediksi</h4>
                            <Eyes>
                                <EyesCard>
                                    <p>Mata Kanan</p>
                                    <Pasfoto src={diagnosis?.prediction?.right_eye_pic} alt="Image eror" />
                                    <p>Kondisi: {diagnosis?.prediction?.right_eye_cond}</p>
                                </EyesCard>

                                <EyesCard>
                                    <p>Mata Kiri</p>
                                    <Pasfoto src={diagnosis?.prediction?.left_eye_pic} alt="Image eror" />
                                    <p>Kondisi: {diagnosis?.prediction?.left_eye_cond}</p>
                                </EyesCard>
                            </Eyes>
                        </EyesTitle>
                    </EyesBox>

                    <Description>
                        <h4>Deskripsi :</h4>
                        <p>{diagnosis?.description}</p>
                    </Description>

                </Content>


            </Report>
        
        </Wrapper>

    )
}

export default ViewDiagnosis