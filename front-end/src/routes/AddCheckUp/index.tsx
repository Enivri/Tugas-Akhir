import React, { ChangeEvent, useEffect, useState } from 'react'
import { Wrapper, Title, Report, ReportTitle, Label, Control, Group, Content, Bottom, SubmitBTN, CancelBTN, Eye, EyeBox, GroupEye, Desc, Formx} from './AddCheckUp.styles'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAppDispatch } from '@store';
import { generatePath, useNavigate } from 'react-router-dom';
import { statusActions } from '@store/status';
import InputFile from '@components/InputFile';
import { CreateCheckUpRequest, CreateCheckUpService } from '@services/createcheckup';
import endpoints from "@constants/routes/admin"
import { usePermission } from '@hooks/usePermission';

const AddCheckUp = () => {
    const CreateCheckUp = usePermission("Create CheckUp")
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [createCheckUpRequest, setCreateCheckUpRequest] = useState<CreateCheckUpRequest>({
        operation_code:"",
        right_eye_pic: undefined,
        left_eye_pic: undefined,
        description:"",
    })
    
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if(CreateCheckUp) {
            e.preventDefault()
            try{
                await dispatch(CreateCheckUpService(createCheckUpRequest)).unwrap()
                navigate(generatePath(endpoints.checkup))

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
                setCreateCheckUpRequest((prev) => ({
                    ...prev,
                    right_eye_pic: newImages[0],
                }))
                break
            case "left_eye_pic":
                setCreateCheckUpRequest((prev) => ({
                    ...prev,
                    left_eye_pic: newImages[0],
                }))
                break
            default:
                setCreateCheckUpRequest((prev) => ({
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
                setCreateCheckUpRequest((prev) => ({
                    ...prev,
                    right_eye_pic: undefined,
                }))
                break
            case "left_eye_pic":
                setCreateCheckUpRequest((prev) => ({
                    ...prev,
                    left_eye_pic: undefined,
                }))
                break
        }
    }

    useEffect(() => {
        if (!CreateCheckUp) {
            const credentials = JSON.parse(localStorage.getItem("credentials") || "")
            const isPatient = credentials.accesses?.some((access: string) => access === "Patient")
            navigate(isPatient ? generatePath(endpoints.dashboard) : generatePath(endpoints.home))
        }
    }, [CreateCheckUp])

    return (
        <Wrapper>
            <Title>Buat Check Up Baru</Title>
            
            <Report>
                <ReportTitle>Form Check Up</ReportTitle>

                <Content className='my-3'>
                        <Formx onSubmit = {onSubmit}>
                        <Row>                    
                                <Group>
                                    <Label>Kode Operasi</Label>
                                    <Control type="text" placeholder="Kode" id="operation_code" value={createCheckUpRequest.operation_code} onChange={onChange}/>
                                </Group>

                                <Eye>
                                    <EyeBox>
                                        <GroupEye>
                                            <Label>Mata Kanan</Label>
                                            <InputFile id="right_eye_pic"
                                            value={createCheckUpRequest.right_eye_pic}
                                            onChange={onChange}
                                            onDelete={onDelete}
                                        />
                                        </GroupEye>
                                    </EyeBox> 

                                    <EyeBox>
                                        <GroupEye>
                                            <Label>Mata Kiri</Label>
                                            <InputFile id="left_eye_pic"
                                            value={createCheckUpRequest.left_eye_pic}
                                            onChange={onChange}
                                            onDelete={onDelete}
                                        />
                                        </GroupEye>
                                    </EyeBox> 
                                </Eye>

                                <Label>Deskripsi</Label>
                                <Desc placeholder="Deskripsi" id="deskripsi" value={createCheckUpRequest.description} onChange={onChange}/>
                        </Row>

                        <Bottom>
                            <CancelBTN to={generatePath(endpoints.checkup)}>Batal</CancelBTN>
                            <SubmitBTN type="submit">Kirim</SubmitBTN>
                        </Bottom>
                        </Formx>
                </Content>
            </Report>
        
        </Wrapper>

    )
}

export default AddCheckUp