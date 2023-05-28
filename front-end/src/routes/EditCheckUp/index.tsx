import React, { ChangeEvent } from 'react'
import { Wrapper, Title, Report, ReportTitle, Label, Control, Group, Content, Bottom, SubmitBTN, CancelBTN, Eye, EyeBox, GroupEye, Desc, Formx } from './EditCheckUp.styles'
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@store';
import { statusActions } from '@store/status';
import { useNavigate, useParams } from 'react-router-dom';
import endpoints from "@constants/routes/admin"
import InputFile from '@components/InputFile';
import { CheckUp } from '@models/CheckUp';
import { EditCheckUpParams, EditCheckUpService } from '@services/editcheckup';
import { GetCheckUpService } from '@services/viewcheckup';

type Params = {
    checkupId: string
}

    const EditCheckUp = () => {
        const [checkup, setCheckUp] = useState<CheckUp>({
            id: 0,
            patient_id: 0,
            doctor_id:0,
            operation_id: 0,
            right_eye_pic: "",
            left_eye_pic: "",
            description: "",
            created_at: "",
            user: undefined,
            operation:undefined,
            },)

            const [editCheckUpRequest, setEditCheckUpRequest] = useState<EditCheckUpParams>({
                checkupId:0,
                patient_id: 0,
                operation_id: 0,
                code: "",
                right_eye_pic: undefined,
                left_eye_pic: undefined,
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
                        checkupId: params.checkupId || "",
                    }
                    const res = await dispatch(GetCheckUpService(request)).unwrap()
                    if (res) {
                        setCheckUp(res)
                        const responseData = res
    
                        const right_eye_pic = await fetchImage(responseData.right_eye_pic)
                        const left_eye_pic = await fetchImage(responseData.left_eye_pic)
    
                        setEditCheckUpRequest((prev) => ({
                            ...prev,
                            checkupId: responseData.id,
                            code: responseData.operation?.code ?? "",
                            patient_id: responseData.patient_id,
                            operation_id: responseData.operation_id,
                            right_eye_pic: right_eye_pic ,
                            left_eye_pic: left_eye_pic,
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
                await dispatch(EditCheckUpService(editCheckUpRequest)).unwrap()
                navigate(endpoints.checkup)
    
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
                    setEditCheckUpRequest((prev) => ({
                        ...prev,
                        right_eye_pic: newImages[0],
                    }))
                    break
                case "left_eye_pic":
                    setEditCheckUpRequest((prev) => ({
                        ...prev,
                        left_eye_pic: newImages[0],
                    }))
                    break       
                default:
                    setEditCheckUpRequest((prev) => ({
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
                    setEditCheckUpRequest((prev) => ({
                        ...prev,
                        right_eye_pic: undefined,
                    }))
                    break
                case "left_eye_pic":
                    setEditCheckUpRequest((prev) => ({
                        ...prev,
                        left_eye_pic: undefined,
                    }))
                    break
            }
        }

    return (
        <Wrapper>
            <Title>Edit CheckUp</Title>
            
            <Report>
                <ReportTitle>CheckUp Form</ReportTitle>

                <Content className='my-3'>
                        <Formx onSubmit = {onSubmit}>
                        <Row>                     
                                <Group>
                                <Label>Operation Code</Label>
                                    <Control type="text" placeholder="Code"  id="code" value={editCheckUpRequest.code} onChange={onChange}/>
                                </Group>

                                <Eye>
                                    <EyeBox>
                                        <GroupEye>
                                            <Label>Mata Kanan</Label>
                                            <InputFile id="right_eye_pic"
                                            value={editCheckUpRequest.right_eye_pic} 
                                            onChange={onChange}
                                            onDelete={onDelete}
                                        />
                                        </GroupEye>
                                    </EyeBox> 

                                    <EyeBox>
                                        <GroupEye>
                                            <Label>Mata Kiri</Label>
                                            <InputFile id="left_eye_pic"
                                            value={editCheckUpRequest.left_eye_pic} 
                                            onChange={onChange}
                                            onDelete={onDelete}
                                        />
                                        </GroupEye>
                                    </EyeBox> 
                                </Eye>

                            <Label>Description</Label>
                            <Desc placeholder="Type here" id="description" value={editCheckUpRequest.description} onChange={onChange}/>
                        </Row>

                        <Bottom>
                            <CancelBTN to="/checkup">Cancel</CancelBTN>
                            <SubmitBTN type="submit">Submit</SubmitBTN>
                        </Bottom>
                        </Formx>
                </Content>
            </Report>
        
        </Wrapper>

    )
}

export default EditCheckUp