import React, { ChangeEvent, useState } from 'react'
import { Wrapper, Title, Report, ReportTitle, Label, Control, Group, Content, Bottom, SubmitBTN, CancelBTN, Eye, EyeBox, GroupEye, Desc, Formx} from './AddOperation.styles'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAppDispatch } from '@store';
import { useNavigate } from 'react-router-dom';
import { statusActions } from '@store/status';
import InputFile from '@components/InputFile';
import { CreateOperationRequest, CreateOperationService } from '@services/createoperation';

const AddOperation = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [createOperationRequest, setCreateOperationRequest] = useState<CreateOperationRequest>({
        code:"",
        right_eye_pic: undefined,
        left_eye_pic: undefined,
        result:"",
        description:"",
    })
    

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            await dispatch(CreateOperationService(createOperationRequest)).unwrap()
            navigate("/operation")

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

    return (
        <Wrapper>
            <Title>Add New Operation</Title>
            
            <Report>
                <ReportTitle>Operation Form</ReportTitle>

                <Content className='my-3'>
                        <Formx onSubmit = {onSubmit}>
                        <Row>
                            <Col>                        
                                <Group>
                                    <Label>Diagnosis Code</Label>
                                    <Control type="text" placeholder="Code" id="code" value={createOperationRequest.code} onChange={onChange}/>
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
                                    <Label>Result</Label>
                                    <Control type="text" placeholder="Successful/Unsuccessful" id="result" value={createOperationRequest.result} onChange={onChange}/>
                                </Group>

                            </Col>

                            <Col>
                            </Col>

                                <Label>Description</Label>
                                <Desc placeholder="Type here" id="description" value={createOperationRequest.description} onChange={onChange}/>
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

export default AddOperation