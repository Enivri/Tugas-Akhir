import React, { ChangeEvent, useEffect, useState } from 'react'
import { Wrapper, Title, Report, ReportTitle, Label, Control, Group, Content, SubTitle, Bottom, SubmitBTN, CancelBTN, Formx } from './EditPatient.styles'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useAppDispatch } from '@store';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { EditUserParams, EditUserService } from '@services/edituser';
import { statusActions } from '@store/status';
import { GetUserService, Response } from '@services/viewuser';
import endpoints from "@constants/routes/admin"
import InputFile from '@components/InputFile';
import { usePermission } from '@hooks/usePermission';

type Params = {
    userId: string
}

const EditPatient = () => {
    const UpdateUser = usePermission("Update User")
    const [user, setUser] = useState<Response>({
        data: {
            id: 0,
            name: "",
            nik: "",
            email: "",
            password: "string",
            town: "",
            gender: "",
            birth_date: "",
            phone: "",
            picture: undefined,
            role: "",
            created_at: "",
        },
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
                    userId: params.userId || "",
                }
                const res = await dispatch(GetUserService(request)).unwrap()
                if (res) {
                    setUser(res)
                    const responseData = res.data

                    const picture = await fetchImage(responseData.picture)

                    setEditUserRequest({
                        userId: responseData.id.toString(),
                        name: responseData.name,
                        nik: responseData.nik,
                        email: responseData.email,
                        town: responseData.town,
                        gender: responseData.gender,
                        birth_date: responseData.birth_date,
                        phone: responseData.phone,
                        picture: picture,
                    })
                }
            } catch(err) {
                dispatch(statusActions.setError((err as Error).message))
            }
        }
        if (UpdateUser) {
            fetchData()
        }
    }, [dispatch, UpdateUser])

    const [editUserRequest, setEditUserRequest] = useState<EditUserParams>({
        userId: "",
        name: "",
        nik: "",
        email: "",
        town: "",
        gender: "",
        birth_date: "",
        phone: "",
        picture: undefined,
    })
    

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            await dispatch(EditUserService(editUserRequest)).unwrap()
            navigate(endpoints.patient)

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
            case "picture":
                setEditUserRequest((prev) => ({
                    ...prev,
                    picture: newImages[0],
                }))
                break
            default:
                setEditUserRequest((prev) => ({
                    ...prev,
                    [id]: value,
                }))
                break
        }
    }

    const onDelete = (e: React.MouseEvent<Element, MouseEvent>) => {
        const { id } = e.currentTarget

        switch (id) {
            case "picture":
                setEditUserRequest((prev) => ({
                    ...prev,
                    picture: undefined,
                }))
                break
        }
    }

    useEffect(() => {
        if (!UpdateUser) {
            const credentials = JSON.parse(localStorage.getItem("credentials") || "")
            const isPatient = credentials.accesses?.some((access: string) => access === "Patient")
            navigate(isPatient ? generatePath(endpoints.dashboard) : generatePath(endpoints.home))
        }
    }, [UpdateUser])

    return (
        <Wrapper>
            <Title>Edit Pasien</Title>
            
            <Report>
                <ReportTitle>Form pasien</ReportTitle>

                <Content className='my-3'>
                        <SubTitle>Identitas Pasien</SubTitle>
                        <Formx onSubmit = {onSubmit}>
                        <Row>
                            <Col>                        
                                <Group>
                                    <Label>Nama Lengkap</Label>
                                    <Control type="text" placeholder="Nama Lengkap" id="name" value={editUserRequest.name} onChange={onChange}/>
                                </Group>

                                <Group>
                                    <Label>NIK</Label>
                                    <Control type="text" placeholder="NIK" id="nik" value={editUserRequest.nik} onChange={onChange}/>
                                </Group>

                                <Group>
                                    <Label>Email</Label>
                                    <Control type="email" placeholder="name@example.com"  id="email" value={editUserRequest.email} onChange={onChange}/>
                                </Group>

                                <Group>
                                    <Label>Tempat Tinggal</Label>
                                    <Control type="text" placeholder="Kota"  id="town" value={editUserRequest.town} onChange={onChange}/>
                                </Group>

                                <Group>
                                    <Label>Jenis kelamin</Label>
                                    <Control type="text" placeholder="male/female" id="gender" value={editUserRequest.gender} onChange={onChange}/>
                                </Group>

                                <Group>
                                    <Label>Tanggal Lahir <br/>(dd/mm/yyyy)</Label>
                                    <Control type="date" placeholder="dd-mm-yyyy"  id="birth_date" value={editUserRequest.birth_date} onChange={onChange}/>
                                </Group>

                                <Group>
                                    <Label>No Telepon</Label>
                                    <Control type="text" placeholder="08xxxxxxx"  id="phone" value={editUserRequest.phone} onChange={onChange}/>
                                </Group>
                            </Col>

                            <Col>
                                <Group>
                                    <Label>Passfoto</Label>

                                    <InputFile id="picture"
                                        value={editUserRequest.picture}
                                        onChange={onChange}
                                        onDelete={onDelete}
                                        />
                                </Group>
                            </Col>
                            </Row>

                        <Bottom>
                            <CancelBTN to={generatePath(endpoints.patient)}>Batal</CancelBTN>
                            <SubmitBTN type="submit">Kirim</SubmitBTN>
                        </Bottom>
                        </Formx>
                </Content>
            </Report>
        
        </Wrapper>

    )
}

export default EditPatient