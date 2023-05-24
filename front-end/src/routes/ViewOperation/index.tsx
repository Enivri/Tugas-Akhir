import React, { } from 'react'
import { Wrapper, Report, ReportTitle, Content, SubTitle, Identity, Pasfoto, SubContent, Titlespace, ImageDiv, Eyes, EyesCard, Description, Titlemargin, SecContent } from './ViewOperation.styles'
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@store';
import { statusActions } from '@store/status';
import { useParams } from 'react-router-dom';
import { parseDate } from '@utils/converter';
import { Operation } from '@models/Operation';
import { GetOperationService } from '@services/viewoperation';

type Params = {
    operationId: string
}

const ViewOperation= () => {
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
            diagnosis:{
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
                    created_at: ""
                }
            }    
})
    
    const params = useParams<Params>()

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
        fetchData()
    }, [dispatch])

    return (
        <Wrapper>
            <Report>
                <ReportTitle>View Operation Detail</ReportTitle>
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
                                <p>{ parseDate(operation?.user?.birth_date) }</p>
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
                        
                        <ImageDiv>
                            <Pasfoto src={operation?.user?.picture} alt="Image eror" />
                        </ImageDiv>
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
                        <Titlemargin>Kode Diagnosis </Titlemargin>
                        <p>:</p>
                        <p>{ operation?.code }</p>
                    </SecContent>

                    <SecContent>
                        <Titlemargin>Result</Titlemargin>
                        <p>:</p>
                        <p>{ operation?.result }</p>
                    </SecContent>

                    <Description>
                        <h4>Description :</h4>
                        <p>{operation?.description}</p>
                    </Description>

                </Content>


            </Report>
        
        </Wrapper>

    )
}

export default ViewOperation