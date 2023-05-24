import React, { } from 'react'
import { Wrapper, Report, ReportTitle, Content, SubTitle, Identity, Pasfoto, SubContent, Titlespace, ImageDiv, Eyes, EyesCard, Description, Titlemargin, SecContent } from './ViewCheckUp.styles'
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@store';
import { statusActions } from '@store/status';
import { useParams } from 'react-router-dom';
import { parseDate } from '@utils/converter';
import { GetCheckUpService } from '@services/viewcheckup';
import { CheckUp } from '@models/CheckUp';

type Params = {
    checkupId: string
}

const ViewCheckUp= () => {
    const [checkup, setCheckup] = useState<CheckUp>({        
            id: 0,
            patient_id: 0,
            doctor_id:0,
            operation_id: 0,
            right_eye_pic: "",
            left_eye_pic: "",
            description: "",
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
            operation:{
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
            }
})
    
    const params = useParams<Params>()

    const dispatch = useAppDispatch()
    useEffect(() => {
        const fetchData = async () =>{
            try{
                const request = {
                    checkupId: params.checkupId || "",
                }
                const res = await dispatch(GetCheckUpService(request)).unwrap()
                if (res) setCheckup(res)
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
                <ReportTitle>View Check Up Detail</ReportTitle>
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
                                <p>{ parseDate(checkup?.user?.birth_date) }</p>
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
                        
                        <ImageDiv>
                            <Pasfoto src={checkup?.user?.picture} alt="Image eror" />
                        </ImageDiv>
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
                        <Titlemargin>Kode Operation </Titlemargin>
                        <p>:</p>
                        <p>{ checkup?.operation?.code }</p>
                    </SecContent>


                    <Description>
                        <h4>Description :</h4>
                        <p>{checkup?.description}</p>
                    </Description>

                </Content>


            </Report>
        
        </Wrapper>

    )
}

export default ViewCheckUp