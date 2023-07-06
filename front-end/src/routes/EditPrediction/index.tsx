import React, { ChangeEvent } from 'react'
import { Wrapper, Title, Report, ReportTitle, Label, Control, Group, Content, SubTitle, Bottom, SubmitBTN, CancelBTN, Eye, EyeBox, GroupEye } from './EditPrediction.styles'
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@store';
import { statusActions } from '@store/status';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { Prediction } from '@models/Prediction';
import { GetPredictionService } from '@services/viewprediction';
import { EditPredictionParams, EditPredictionService } from '@services/editprediction';
import endpoints from "@constants/routes/admin"
import InputFile from '@components/InputFile';
import { Form } from 'react-bootstrap';
import { usePermission } from '@hooks/usePermission';

type Params = {
    predictionId: string
}

    const EditPrediction = () => {
        const UpdatePrediction = usePermission("Update Prediction")
        const [prediction, setPrediction] = useState<Prediction>({
            id: 0,
            patient_id: 0,
            right_eye_pic: undefined,
            left_eye_pic: undefined,
            right_eye_cond: "",
            left_eye_cond:"",
            created_at: "",
            user: undefined,
            },)

        const [editPredictionRequest, setEditPredictionRequest] = useState<EditPredictionParams>({
            predictionId:0,
            patient_id: 0,
            right_eye_pic: undefined,
            left_eye_pic: undefined,
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
                        predictionId: params.predictionId || "",
                    }
                    const res = await dispatch(GetPredictionService(request)).unwrap()
                    if (res) {
                        setPrediction(res)
                        const responseData = res
    
                        const right_eye_pic = await fetchImage(responseData.right_eye_pic)
                        const left_eye_pic = await fetchImage(responseData.left_eye_pic)
    
                        setEditPredictionRequest((prev) => ({
                            ...prev,
                            predictionId: responseData.id,
                            patient_id: responseData.patient_id,
                            right_eye_pic: right_eye_pic ,
                            left_eye_pic: left_eye_pic,
                            nik: responseData.user?.nik ?? "",
                        }))
                    }
                } catch(err) {
                    dispatch(statusActions.setError((err as Error).message))
                }
            }
            if (UpdatePrediction) {
                fetchData()
            }
        }, [dispatch, UpdatePrediction])    
    
        const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            try{
                await dispatch(EditPredictionService(editPredictionRequest)).unwrap()
                navigate(endpoints.prediction)
    
            } catch(err) {
                dispatch(statusActions.setError((err as Error).message))
            }
        }
    
        const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                    setEditPredictionRequest((prev) => ({
                        ...prev,
                        right_eye_pic: newImages[0],
                    }))
                    break
                case "left_eye_pic":
                    setEditPredictionRequest((prev) => ({
                        ...prev,
                        left_eye_pic: newImages[0],
                    }))
                    break       
                default:
                    setEditPredictionRequest((prev) => ({
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
                    setEditPredictionRequest((prev) => ({
                        ...prev,
                        right_eye_pic: undefined,
                    }))
                    break
                case "left_eye_pic":
                    setEditPredictionRequest((prev) => ({
                        ...prev,
                        left_eye_pic: undefined,
                    }))
                    break
            }
        }

        useEffect(() => {
            if (!UpdatePrediction) {
                const credentials = JSON.parse(localStorage.getItem("credentials") || "")
                const isPatient = credentials.accesses?.some((access: string) => access === "Patient")
                navigate(isPatient ? generatePath(endpoints.dashboard) : generatePath(endpoints.home))
            }
        }, [UpdatePrediction])

    return (
        <Wrapper>
            <Title>Edit Prediksi</Title>
            
            <Report>
                <ReportTitle>Form Prediksi</ReportTitle>
                <Content className='my-3'>
                        <SubTitle>Identitas Pasien</SubTitle>
                        <Form onSubmit = {onSubmit}>
                        <Row>
                                <Group>
                                    <Label>NIK</Label>
                                    <Control type="text" placeholder="NIK"  id="nik" value={editPredictionRequest.nik} onChange={onChange}/>
                                </Group>

                                <Eye>
                                    <EyeBox>
                                        <GroupEye>
                                            <Label>Mata Kanan</Label>
                                            <InputFile id="right_eye_pic"
                                            value={editPredictionRequest.right_eye_pic} 
                                            onChange={onChange}
                                            onDelete={onDelete}
                                        />
                                        </GroupEye>
                                    </EyeBox> 

                                    <EyeBox>
                                        <GroupEye>
                                            <Label>Mata Kiri</Label>
                                            <InputFile id="left_eye_pic"
                                            value={editPredictionRequest.left_eye_pic} 
                                            onChange={onChange}
                                            onDelete={onDelete}
                                        />
                                        </GroupEye>
                                    </EyeBox> 
                                </Eye>
                        </Row>

                        <Bottom>
                            <CancelBTN to={generatePath(endpoints.prediction)}>Batal</CancelBTN>
                            <SubmitBTN type="submit">Kirim</SubmitBTN>
                        </Bottom>
                        </Form>
                </Content>
            </Report>
        
        </Wrapper>

    )
}

export default EditPrediction