import React, { ChangeEvent, useEffect, useState } from 'react'
import { Wrapper, Title, Report, ReportTitle, Label, Content, Bottom, SubmitBTN, CancelBTN, Eye, EyeBox, GroupEye, Formx } from './AddTrial.styles'
import Row from 'react-bootstrap/Row';
import { useAppDispatch } from '@store';
import { generatePath, useNavigate } from 'react-router-dom';
import { statusActions } from '@store/status';
import InputFile from '@components/InputFile';
import { CreateTrialRequest, CreateTrialService } from '@services/createtrial';
import endpoints from '@constants/routes/admin';
import { usePermission } from '@hooks/usePermission';

const AddTrial= () => {
    const CreateTrial = usePermission("Create Trial")
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [createTrialRequest, setCreateTrialRequest] = useState<CreateTrialRequest>({
        right_eye_pic: undefined,
        left_eye_pic: undefined,
    })
    

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if(CreateTrial) {
            e.preventDefault()
            try{
                await dispatch(CreateTrialService(createTrialRequest)).unwrap()
                navigate(generatePath(endpoints.dashboard))

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
                setCreateTrialRequest((prev) => ({
                    ...prev,
                    right_eye_pic: newImages[0],
                }))
                break
            case "left_eye_pic":
                setCreateTrialRequest((prev) => ({
                    ...prev,
                    left_eye_pic: newImages[0],
                }))
                break
            default:
                setCreateTrialRequest((prev) => ({
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
                setCreateTrialRequest((prev) => ({
                    ...prev,
                    right_eye_pic: undefined,
                }))
                break
            case "left_eye_pic":
                setCreateTrialRequest((prev) => ({
                    ...prev,
                    left_eye_pic: undefined,
                }))
                break
        }
    }

    useEffect(() => {
        if (!CreateTrial) {
            const credentials = JSON.parse(localStorage.getItem("credentials") || "")
            const isPatient = credentials.accesses?.some((access: string) => access === "Patient")
            navigate(isPatient ? generatePath(endpoints.dashboard) : generatePath(endpoints.home))
        }
    }, [CreateTrial])

    return (
        <Wrapper>
            <Title>Tambah Prediksi Baru</Title>
            
            <Report>
                <ReportTitle>Form Prediski</ReportTitle>

                <Content className='my-3'>
                        <Formx onSubmit = {onSubmit}>
                        <Row>                      
                            <Eye>
                                <EyeBox>
                                    <GroupEye>
                                        <Label>Mata Kanan</Label>
                                        <InputFile id="right_eye_pic"
                                        value={createTrialRequest.right_eye_pic}
                                        onChange={onChange}
                                        onDelete={onDelete}
                                    />
                                    </GroupEye>
                                </EyeBox> 

                                <EyeBox>
                                    <GroupEye>
                                        <Label>Mata Kiri</Label>
                                        <InputFile id="left_eye_pic"
                                        value={createTrialRequest.left_eye_pic}
                                        onChange={onChange}
                                        onDelete={onDelete}
                                        />
                                    </GroupEye>
                                </EyeBox> 
                            </Eye>

                        </Row>

                        <Bottom>
                            <CancelBTN to={generatePath(endpoints.dashboard)}>Batal</CancelBTN>
                            <SubmitBTN type="submit">Kirim</SubmitBTN>
                        </Bottom>
                        </Formx>
                </Content>
            </Report>
        
        </Wrapper>

    )
}

export default AddTrial