import React, { ChangeEvent, useEffect, useState } from 'react'
import { Wrapper, Title, Report, ReportTitle, Label, Control, Group, Content, SubTitle, Bottom, SubmitBTN, CancelBTN, Eye, EyeBox, GroupEye, Formx } from './AddPrediction.styles'
import Row from 'react-bootstrap/Row';
import { useAppDispatch } from '@store';
import { generatePath, useNavigate } from 'react-router-dom';
import { CreatePredictionRequest, CreatePredictionService } from '@services/createprediction';
import { statusActions } from '@store/status';
import InputFile from '@components/InputFile';
import endpoints from '@constants/routes/admin';
import { usePermission } from '@hooks/usePermission';

const AddPrediction = () => {
    const CreatePrediction = usePermission("Create Prediction")
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [createPredictionRequest, setCreatePredictionRequest] = useState<CreatePredictionRequest>({
        nik:"",
        right_eye_pic: undefined,
        left_eye_pic: undefined,
    })
    

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if(CreatePrediction) {
            e.preventDefault()
            try{
                await dispatch(CreatePredictionService(createPredictionRequest)).unwrap()
                navigate(generatePath(endpoints.prediction))

            } catch(err) {
                alert((err as Error).message)
                dispatch(statusActions.setError((err as Error).message))
            }
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
                setCreatePredictionRequest((prev) => ({
                    ...prev,
                    right_eye_pic: newImages[0],
                }))
                break
            case "left_eye_pic":
                setCreatePredictionRequest((prev) => ({
                    ...prev,
                    left_eye_pic: newImages[0],
                }))
                break
            default:
                setCreatePredictionRequest((prev) => ({
                    ...prev,
                    [id]: value,
                }))
                break
        }
    }

    useEffect(() => {
        if (!CreatePrediction) {
            const credentials = JSON.parse(localStorage.getItem("credentials") || "")
            const isPatient = credentials.accesses?.some((access: string) => access === "Patient")
            navigate(isPatient ? generatePath(endpoints.dashboard) : generatePath(endpoints.home))
        }
    }, [CreatePrediction])

    const onDelete = (e: React.MouseEvent<Element, MouseEvent>) => {
        const { id } = e.currentTarget

        switch (id) {
            case "right_eye_pic":
                setCreatePredictionRequest((prev) => ({
                    ...prev,
                    right_eye_pic: undefined,
                }))
                break
            case "left_eye_pic":
                setCreatePredictionRequest((prev) => ({
                    ...prev,
                    left_eye_pic: undefined,
                }))
                break
        }
    }

    return (
        <Wrapper>
            <Title>Buat Prediksi Baru</Title>
            
            <Report>
                <ReportTitle>Form Prediksi</ReportTitle>

                <Content className='my-3'>
                        <SubTitle>Identitas Pasien</SubTitle>
                        <Formx onSubmit = {onSubmit}>
                        <Row>                      
                                <Group>
                                    <Label>NIK</Label>
                                    <Control type="text" placeholder="NIK" id="nik" value={createPredictionRequest.nik} onChange={onChange}/>
                                </Group>

                                <Eye>
                                    <EyeBox>
                                        <GroupEye>
                                            <Label>Mata Kanan</Label>
                                            <InputFile id="right_eye_pic"
                                            value={createPredictionRequest.right_eye_pic}
                                            onChange={onChange}
                                            onDelete={onDelete}
                                        />
                                        </GroupEye>
                                    </EyeBox> 

                                    <EyeBox>
                                        <GroupEye>
                                            <Label>Mata Kiri</Label>
                                            <InputFile id="left_eye_pic"
                                            value={createPredictionRequest.left_eye_pic}
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
                        </Formx>
                </Content>
            </Report>
        
        </Wrapper>

    )
}

export default AddPrediction