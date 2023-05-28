import React, { } from 'react'
import { Wrapper, Report, ReportTitle, Content, SubTitle, Identity, Pasfoto, SubContent, Titlespace, ImageDiv, Eyes, EyesCard, EyesTitle, EyesBox, Description } from './ViewDiagnosis.styles'
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@store';
import { statusActions } from '@store/status';
import { useParams } from 'react-router-dom';
import { parseDate } from '@utils/converter';
import { GetDiagnosisService } from '@services/viewdiagnosis';
import { Diagnosis } from '@models/Diagnosis';

type Params = {
    diagnosisId: string
}

const ViewDiagnosis= () => {
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
            user: {
                id: 0,
                name: "",
                nik: "",
                email: "",
                password: "string",
                town: "",
                gender: "",
                birth_date: "",
                phone: "",
                picture: "",
                role: "",
                created_at: "",
                },
            prediction:{
                id: 0,
                patient_id: 0,
                user: {
                    id: 0,
                    name: "",
                    nik: "",
                    email: "",
                    password: "string",
                    town: "",
                    gender: "",
                    birth_date: "",
                    phone: "",
                    picture: "",
                    role: "",
                    created_at: "",
                    },
                right_eye_pic: "",
                left_eye_pic: "",
                right_eye_cond: "",
                left_eye_cond:"",
                created_at: "",
            },
})
    
    const params = useParams<Params>()

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
        fetchData()
    }, [dispatch])

    return (
        <Wrapper>
            <Report>
                <ReportTitle>View Diagnosis Detail</ReportTitle>
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
                                <p>{ parseDate(diagnosis?.user?.birth_date) }</p>
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
                        
                        <ImageDiv>
                            <Pasfoto src={diagnosis?.user?.picture} alt="Image eror" />
                        </ImageDiv>
                    </Identity>

                    <EyesBox>
                        <EyesTitle>
                            <h4>Diagnosis</h4>
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
                            <h4>Prediction</h4>
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
                        <h4>Description :</h4>
                        <p>{diagnosis?.description}</p>
                    </Description>

                </Content>


            </Report>
        
        </Wrapper>

    )
}

export default ViewDiagnosis