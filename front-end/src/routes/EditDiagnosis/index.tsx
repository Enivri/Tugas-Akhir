import React, { ChangeEvent } from 'react'
import { Wrapper, Title, Report, ReportTitle, Label, Control, Group, Content, SubTitle, Bottom, SubmitBTN, CancelBTN, Eye, EyeBox, GroupEye, Desc, Formx } from './EditDiagnosis.styles'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@store';
import { statusActions } from '@store/status';
import { useNavigate, useParams } from 'react-router-dom';
import endpoints from "@constants/routes/admin"
import InputFile from '@components/InputFile';
import { Diagnosis } from '@models/Diagnosis';
import { EditDiagnosisParams, EditDiagnosisService } from '@services/editdiagnosis';
import { GetDiagnosisService } from '@services/viewdiagnosis';

type Params = {
    diagnosisId: string
}

    const EditDiagnosis= () => {
        const [diagnosis, setDiagnosis] = useState<Diagnosis>({
            id: 0,
            patient_id: 0,
            doctor_id: 0,
            prediction_id: 0,
            code: "",
            right_eye_pic: undefined,
            left_eye_pic: undefined,
            right_eye_cond: "",
            left_eye_cond:"",
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
            },)

            const [editDiagnosisRequest, setEditDiagnosisRequest] = useState<EditDiagnosisParams>({
                diagnosisId:0,
                patient_id: 0,
                doctor_id: 0,
                prediction_id: 0,
                code: "",
                right_eye_pic: undefined,
                left_eye_pic: undefined,
                right_eye_cond: "",
                left_eye_cond:"",
                description: "",
                nik: "",
            })
            
        
        const params = useParams<Params>()
        const dispatch = useAppDispatch()
        const navigate = useNavigate()
    
    
        useEffect(() => {
            const fetchImage = async (image_url?: string) => {
                if (!image_url) return undefined
                const response = await fetch(image_url)
                const blob = await response.blob()
                const file = new File([blob], (image_url.match(/.*\/(.+?)\./) as string[])[1], { type: blob.type })
                return file
            }
    
            const fetchData = async () =>{
                try{
                    const request = {
                        diagnosisId: params.diagnosisId || "",
                    }
                    const res = await dispatch(GetDiagnosisService(request)).unwrap()
                    if (res) {
                        setDiagnosis(res)
                        const responseData = res
    
                        const right_eye_pic = await fetchImage(responseData.right_eye_pic)
                        const left_eye_pic = await fetchImage(responseData.left_eye_pic)
    
                        setEditDiagnosisRequest((prev) => ({
                            ...prev,
                            diagnosisId: responseData.id,
                            patient_id: responseData.patient_id,
                            right_eye_pic: right_eye_pic ,
                            left_eye_pic: left_eye_pic,
                            right_eye_cond: responseData.right_eye_cond,
                            left_eye_cond: responseData.left_eye_cond,
                            description: responseData.description,
                            nik: responseData.user.nik,
                        }))
                    }
                } catch(err) {
                    dispatch(statusActions.setError((err as Error).message))
                }
            }
            fetchData()
        }, [dispatch])      
    
        const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            try{
                await dispatch(EditDiagnosisService(editDiagnosisRequest)).unwrap()
                navigate(endpoints.diagnosis)
    
            } catch(err) {
                dispatch(statusActions.setError((err as Error).message))
            }
        }
    
        const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            const { id, value, files } = (e.currentTarget as HTMLInputElement)

            const newImages: File[] = []
            if (files) {
                for (let i = 0; i < (files as FileList).length; i++){
                    const file = (files as FileList).item(i)
                    newImages.push(file as File)
                }
            }
            
            switch (id) {
                case "right_eye_pic":
                    setEditDiagnosisRequest((prev) => ({
                        ...prev,
                        right_eye_pic: newImages[0],
                    }))
                    break
                case "left_eye_pic":
                    setEditDiagnosisRequest((prev) => ({
                        ...prev,
                        left_eye_pic: newImages[0],
                    }))
                    break       
                default:
                    setEditDiagnosisRequest((prev) => ({
                        ...prev,
                        [id]: value,
                    }))
                    break
            }
        }
    
        const onDelete = (e: React.MouseEvent<Element, MouseEvent>) => {
            const { id } = e.currentTarget
    
            switch (id) {
                case "right_eye_pic":
                    setEditDiagnosisRequest((prev) => ({
                        ...prev,
                        right_eye_pic: undefined,
                    }))
                    break
                case "left_eye_pic":
                    setEditDiagnosisRequest((prev) => ({
                        ...prev,
                        left_eye_pic: undefined,
                    }))
                    break
            }
        }

    return (
        <Wrapper>
            <Title>Edit Diagnosis</Title>
            
            <Report>
                <ReportTitle>Diagnosis Form</ReportTitle>

                <Content className='my-3'>
                        <SubTitle>Identitas Pasien</SubTitle>
                        <Formx onSubmit = {onSubmit}>
                        <Row>
                            <Col>                        
                                <Group>
                                    <Label>NIK</Label>
                                    <Control type="text" placeholder="NIK"  id="nik" value={editDiagnosisRequest.nik} onChange={onChange}/>
                                </Group>

                                <Eye>
                                    <EyeBox>
                                        <GroupEye>
                                            <Label>Mata Kanan</Label>
                                            <InputFile id="right_eye_pic"
                                            value={editDiagnosisRequest.right_eye_pic} 
                                            onChange={onChange}
                                            onDelete={onDelete}
                                        />
                                        </GroupEye>
                                    </EyeBox> 

                                    <EyeBox>
                                        <GroupEye>
                                            <Label>Mata Kiri</Label>
                                            <InputFile id="left_eye_pic"
                                            value={editDiagnosisRequest.left_eye_pic} 
                                            onChange={onChange}
                                            onDelete={onDelete}
                                        />
                                        </GroupEye>
                                    </EyeBox> 
                                </Eye>

                                <Group>
                                    <Label>Kondisi Mata Kanan</Label>
                                    <Control type="text" placeholder="Normal/Katarak"  id="right_eye_cond" value={editDiagnosisRequest.right_eye_cond} onChange={onChange}/>
                                </Group>

                                <Group>
                                    <Label>Kondisi Mata Kiri</Label>
                                    <Control type="text" placeholder="Normal/Katarak"  id="left_eye_cond" value={editDiagnosisRequest.left_eye_cond} onChange={onChange}/>
                                </Group>
                            </Col>

                            <Col>
                            </Col>
                            
                            <Label>Description</Label>
                            <Desc placeholder="Type here" id="description" value={editDiagnosisRequest.description} onChange={onChange}/>
                        </Row>

                        <Bottom>
                            <CancelBTN to="/patient">Cancel</CancelBTN>
                            <SubmitBTN type="submit">Submit</SubmitBTN>
                        </Bottom>
                        </Formx>
                </Content>
            </Report>
        
        </Wrapper>

    )
}

export default EditDiagnosis