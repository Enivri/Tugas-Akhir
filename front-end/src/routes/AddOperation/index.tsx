import React, { ChangeEvent, useEffect, useState } from 'react'
import { Wrapper, Title, Report, ReportTitle, Label, Control, Group, Content, Bottom, SubmitBTN, CancelBTN, Eye, EyeBox, GroupEye, Desc, Formx} from './AddOperation.styles'
import Row from 'react-bootstrap/Row';
import { useAppDispatch } from '@store';
import { generatePath, useNavigate } from 'react-router-dom';
import { statusActions } from '@store/status';
import InputFile from '@components/InputFile';
import { CreateOperationRequest, CreateOperationService } from '@services/createoperation';
import endpoints from "@constants/routes/admin"
import { usePermission } from '@hooks/usePermission';

const AddOperation = () => {
    const CreateOperation = usePermission("Create Operation")
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [createOperationRequest, setCreateOperationRequest] = useState<CreateOperationRequest>({
        diagnosis_code:"",
        right_eye_pic: undefined,
        left_eye_pic: undefined,
        result:"",
        description:"",
    })
    

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if(CreateOperation) {
            e.preventDefault()
            try{
                await dispatch(CreateOperationService(createOperationRequest)).unwrap()
                navigate(generatePath(endpoints.operation))

            } catch(err) {
                alert((err as Error).message)
                dispatch(statusActions.setError((err as Error).message))
            }
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
                setCreateOperationRequest((prev) => ({
                    ...prev,
                    right_eye_pic: newImages[0],
                }))
                break
            case "left_eye_pic":
                setCreateOperationRequest((prev) => ({
                    ...prev,
                    left_eye_pic: newImages[0],
                }))
                break
            default:
                setCreateOperationRequest((prev) => ({
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
                setCreateOperationRequest((prev) => ({
                    ...prev,
                    right_eye_pic: undefined,
                }))
                break
            case "left_eye_pic":
                setCreateOperationRequest((prev) => ({
                    ...prev,
                    left_eye_pic: undefined,
                }))
                break
        }
    }

    useEffect(() => {
        if (!CreateOperation) {
            const credentials = JSON.parse(localStorage.getItem("credentials") || "")
            const isPatient = credentials.accesses?.some((access: string) => access === "Patient")
            navigate(isPatient ? generatePath(endpoints.dashboard) : generatePath(endpoints.home))
        }
    }, [CreateOperation])

    return (
        <Wrapper>
            <Title>Buat Operasi Baru</Title>
            
            <Report>
                <ReportTitle>Form Operasi</ReportTitle>

                <Content className='my-3'>
                        <Formx onSubmit = {onSubmit}>
                        <Row>                   
                                <Group>
                                    <Label>Kode Diagnosa</Label>
                                    <Control type="text" placeholder="Code" id="diagnosis_code" value={createOperationRequest.diagnosis_code} onChange={onChange}/>
                                </Group>

                                <Eye>
                                    <EyeBox>
                                        <GroupEye>
                                            <Label>Mata Kanan</Label>
                                            <InputFile id="right_eye_pic"
                                            value={createOperationRequest.right_eye_pic}
                                            onChange={onChange}
                                            onDelete={onDelete}
                                        />
                                        </GroupEye>
                                    </EyeBox> 

                                    <EyeBox>
                                        <GroupEye>
                                            <Label>Mata Kiri</Label>
                                            <InputFile id="left_eye_pic"
                                            value={createOperationRequest.left_eye_pic}
                                            onChange={onChange}
                                            onDelete={onDelete}
                                        />
                                        </GroupEye>
                                    </EyeBox> 
                                </Eye>

                                <Group>
                                    <Label>Hasil</Label>
                                    <Control type="text" placeholder="Berhasil / Gagal" id="result" value={createOperationRequest.result} onChange={onChange}/>
                                </Group>

                                <Label>Deskripsi</Label>
                                <Desc placeholder="Deskripsi" id="description" value={createOperationRequest.description} onChange={onChange}/>
                        </Row>

                        <Bottom>
                            <CancelBTN to={generatePath(endpoints.operation)}>Batal</CancelBTN>
                            <SubmitBTN type="submit">Kirim</SubmitBTN>
                        </Bottom>
                        </Formx>
                </Content>
            </Report>
        
        </Wrapper>

    )
}

export default AddOperation