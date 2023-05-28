import React, { ChangeEvent, useState } from 'react'
import { Wrapper, Title, Report, ReportTitle, Label, Control, Group, Content, SubTitle, Bottom, SubmitBTN, CancelBTN, Eye, EyeBox, GroupEye, Desc, Formx} from './AddDiagnosis.styles'
import Row from 'react-bootstrap/Row';
import { useAppDispatch } from '@store';
import { useNavigate } from 'react-router-dom';
import { statusActions } from '@store/status';
import InputFile from '@components/InputFile';
import { CreateDiagnosisRequest, CreateDiagnosisService } from '@services/creatediagnosis';

const AddDiagnosis = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [createDiagnosisRequest, setCreateDiagnosisRequest] = useState<CreateDiagnosisRequest>({
        nik:"",
        right_eye_pic: undefined,
        left_eye_pic: undefined,
        right_eye_cond: "",
        left_eye_cond: "",
        description:"",
    })
    

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            await dispatch(CreateDiagnosisService(createDiagnosisRequest)).unwrap()
            navigate("/diagnosis")

        } catch(err) {
            alert((err as Error).message)
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
                setCreateDiagnosisRequest((prev) => ({
                    ...prev,
                    right_eye_pic: newImages[0],
                }))
                break
            case "left_eye_pic":
                setCreateDiagnosisRequest((prev) => ({
                    ...prev,
                    left_eye_pic: newImages[0],
                }))
                break
            default:
                setCreateDiagnosisRequest((prev) => ({
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
                setCreateDiagnosisRequest((prev) => ({
                    ...prev,
                    right_eye_pic: undefined,
                }))
                break
            case "left_eye_pic":
                setCreateDiagnosisRequest((prev) => ({
                    ...prev,
                    left_eye_pic: undefined,
                }))
                break
        }
    }

    return (
        <Wrapper>
            <Title>Add New Diagnosis</Title>
            
            <Report>
                <ReportTitle>Diagnosis Form</ReportTitle>

                <Content className='my-3'>
                        <SubTitle>Identitas Pasien</SubTitle>
                        <Formx onSubmit = {onSubmit}>
                        <Row>                   
                                <Group>
                                    <Label>NIK</Label>
                                    <Control type="text" placeholder="NIK" id="nik" value={createDiagnosisRequest.nik} onChange={onChange}/>
                                </Group>

                                <Eye>
                                    <EyeBox>
                                        <GroupEye>
                                            <Label>Mata Kanan</Label>
                                            <InputFile id="right_eye_pic"
                                            value={createDiagnosisRequest.right_eye_pic}
                                            onChange={onChange}
                                            onDelete={onDelete}
                                        />
                                        </GroupEye>
                                    </EyeBox> 

                                    <EyeBox>
                                        <GroupEye>
                                            <Label>Mata Kiri</Label>
                                            <InputFile id="left_eye_pic"
                                            value={createDiagnosisRequest.left_eye_pic}
                                            onChange={onChange}
                                            onDelete={onDelete}
                                        />
                                        </GroupEye>
                                    </EyeBox> 
                                </Eye>

                                <Group>
                                    <Label>Kondisi Mata Kanan</Label>
                                    <Control type="text" placeholder="Normal/Katarak" id="right_eye_cond" value={createDiagnosisRequest.right_eye_cond} onChange={onChange}/>
                                </Group>

                                <Group>
                                    <Label>Kondisi Mata Kiri</Label>
                                    <Control type="text" placeholder="Normal/Katarak" id="left_eye_cond" value={createDiagnosisRequest.left_eye_cond} onChange={onChange}/>
                                </Group>

                                <Label>Description</Label>
                                <Desc placeholder="Type here" id="description" value={createDiagnosisRequest.description} onChange={onChange}/>
                        </Row>

                        <Bottom>
                            <CancelBTN to="/diagnosis">Cancel</CancelBTN>
                            <SubmitBTN type="submit">Submit</SubmitBTN>
                        </Bottom>
                        </Formx>
                </Content>
            </Report>
        
        </Wrapper>

    )
}

export default AddDiagnosis