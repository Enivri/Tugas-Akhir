import React, { ChangeEvent } from 'react'
import { Wrapper, Title, Report, ReportTitle, Label, Control, Group, Content, Bottom, SubmitBTN, CancelBTN, Eye, EyeBox, GroupEye, Desc, Formx } from './EditOperation.styles'
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@store';
import { statusActions } from '@store/status';
import { useNavigate, useParams } from 'react-router-dom';
import endpoints from "@constants/routes/admin"
import InputFile from '@components/InputFile';
import { Operation } from '@models/Operation';
import { EditOperationParams, EditOperationService } from '@services/editoperation';
import { GetOperationService } from '@services/viewoperation';

type Params = {
    operationId: string
}

    const EditOperation= () => {
        const [operation, setOperation] = useState<Operation>({
            id: 0,
            patient_id: 0,
            doctor_id:0,
            diagnosis_id: 0,
            code: "",
            right_eye_pic: undefined,
            left_eye_pic: undefined,
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
            },)

            const [editOperationRequest, setEditOperationRequest] = useState<EditOperationParams>({
                operationId:0,
                patient_id: 0,
                diagnosis_id: 0,
                code: "",
                right_eye_pic: undefined,
                left_eye_pic: undefined,
                result: "",
                description: "",
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
                        operationId: params.operationId || "",
                    }
                    const res = await dispatch(GetOperationService(request)).unwrap()
                    if (res) {
                        setOperation(res)
                        const responseData = res
    
                        const right_eye_pic = await fetchImage(responseData.right_eye_pic)
                        const left_eye_pic = await fetchImage(responseData.left_eye_pic)
    
                        setEditOperationRequest((prev) => ({
                            ...prev,
                            operationId: responseData.id,
                            code: responseData.diagnosis.code,
                            patient_id: responseData.patient_id,
                            diagnosis_id: responseData.diagnosis_id,
                            right_eye_pic: right_eye_pic ,
                            left_eye_pic: left_eye_pic,
                            result: responseData.result,
                            description: responseData.description
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
                await dispatch(EditOperationService(editOperationRequest)).unwrap()
                navigate(endpoints.operation)
    
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
                    setEditOperationRequest((prev) => ({
                        ...prev,
                        right_eye_pic: newImages[0],
                    }))
                    break
                case "left_eye_pic":
                    setEditOperationRequest((prev) => ({
                        ...prev,
                        left_eye_pic: newImages[0],
                    }))
                    break       
                default:
                    setEditOperationRequest((prev) => ({
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
                    setEditOperationRequest((prev) => ({
                        ...prev,
                        right_eye_pic: undefined,
                    }))
                    break
                case "left_eye_pic":
                    setEditOperationRequest((prev) => ({
                        ...prev,
                        left_eye_pic: undefined,
                    }))
                    break
            }
        }

    return (
        <Wrapper>
            <Title>Edit Operation</Title>
            
            <Report>
                <ReportTitle>Operation Form</ReportTitle>

                <Content className='my-3'>
                        <Formx onSubmit = {onSubmit}>
                        <Row>                      
                                <Group>
                                    <Label>Diagnosis Code</Label>
                                    <Control type="text" placeholder="Code"  id="code" value={editOperationRequest.code} onChange={onChange}/>
                                </Group>

                                <Eye>
                                    <EyeBox>
                                        <GroupEye>
                                            <Label>Mata Kanan</Label>
                                            <InputFile id="right_eye_pic"
                                            value={editOperationRequest.right_eye_pic} 
                                            onChange={onChange}
                                            onDelete={onDelete}
                                        />
                                        </GroupEye>
                                    </EyeBox> 

                                    <EyeBox>
                                        <GroupEye>
                                            <Label>Mata Kiri</Label>
                                            <InputFile id="left_eye_pic"
                                            value={editOperationRequest.left_eye_pic} 
                                            onChange={onChange}
                                            onDelete={onDelete}
                                        />
                                        </GroupEye>
                                    </EyeBox> 
                                </Eye>

                                <Group>
                                    <Label>Result</Label>
                                    <Control type="text" placeholder="Successful/Unsuccessful"  id="result" value={editOperationRequest.result} onChange={onChange}/>
                                </Group>
                            
                            <Label>Description</Label>
                            <Desc placeholder="Type here" id="description" value={editOperationRequest.description} onChange={onChange}/>
                        </Row>

                        <Bottom>
                            <CancelBTN to="/operation">Cancel</CancelBTN>
                            <SubmitBTN type="submit">Submit</SubmitBTN>
                        </Bottom>
                        </Formx>
                </Content>
            </Report>
        
        </Wrapper>

    )
}

export default EditOperation