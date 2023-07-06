import { Wrapper, Title, Report, ReportTitle, Label, Control, Group, Content, SubTitle, Bottom, SubmitBTN, CancelBTN, Formx } from './AddDoctor.styles'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useAppDispatch } from '@store'
import { generatePath, useNavigate } from 'react-router-dom'
import { statusActions } from '@store/status';
import InputFile from '@components/InputFile';
import { CreateDoctorRequest, CreateDoctorService } from '@services/createdoctor';
import endpoints from "@constants/routes/admin"
import { usePermission } from '@hooks/usePermission';

const AddDoctor = () => {
    const CreateDoctor = usePermission("Create Doctor")
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [createDoctorRequest, setCreateDoctorRequest] = useState<CreateDoctorRequest>({
        name: "",
        nik: "",
        email: "",
        password: "",
        town: "",
        gender: "",
        birth_date: "",
        phone: "",
        picture: undefined,
    })
    

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if(CreateDoctor) {
            e.preventDefault()
            try{
                await dispatch(CreateDoctorService(createDoctorRequest)).unwrap()
                navigate(generatePath(endpoints.doctor))

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
            case "picture":
                setCreateDoctorRequest((prev) => ({
                    ...prev,
                    picture: newImages[0],
                }))
                break
            default:
                setCreateDoctorRequest((prev) => ({
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
                setCreateDoctorRequest((prev) => ({
                    ...prev,
                    picture: undefined,
                }))
                break
        }
    }

    useEffect(() => {
        if (!CreateDoctor) {
            const credentials = JSON.parse(localStorage.getItem("credentials") || "")
            const isPatient = credentials.accesses?.some((access: string) => access === "Patient")
            navigate(isPatient ? generatePath(endpoints.dashboard) : generatePath(endpoints.home))
        }
    }, [CreateDoctor])

    return (
        <Wrapper>
            <Title>Buat Dokter Baru</Title>
            
            <Report>
                <ReportTitle>Form Dokter</ReportTitle>

                <Content className='my-3'>
                        <SubTitle>Identitas Doctor</SubTitle>
                        <Formx onSubmit = {onSubmit}>
                            <Row>
                            <Col>                        
                                <Group>
                                    <Label>Nama Lengkap</Label>
                                    <Control type="text" placeholder="Nama Lengkap" id="name" value={createDoctorRequest.name} onChange={onChange}/>
                                </Group>

                                <Group>
                                    <Label>NIK</Label>
                                    <Control type="text" placeholder="NIK" id="nik" value={createDoctorRequest.nik} onChange={onChange}/>
                                </Group>

                                <Group>
                                    <Label>Email</Label>
                                    <Control type="email" placeholder="name@example.com"  id="email" value={createDoctorRequest.email} onChange={onChange}/>
                                </Group>

                                <Group>
                                    <Label>Password</Label>
                                    <Control type="password" placeholder="*********"  id="password" value={createDoctorRequest.password} onChange={onChange}/>
                                </Group>

                                <Group>
                                    <Label>Tempat Tinggal</Label>
                                    <Control type="text" placeholder="Kota"  id="town" value={createDoctorRequest.town} onChange={onChange}/>
                                </Group>

                                <Group>
                                    <Label>Jenis kelamin</Label>
                                    <Control type="text" placeholder="male/female" id="gender" value={createDoctorRequest.gender} onChange={onChange}/>
                                </Group>

                                <Group>
                                    <Label>Tanggal Lahir <br/>(dd/mm/yyyy)</Label>
                                    <Control type="date" placeholder="dd-mm-yyyy"  id="birth_date" value={createDoctorRequest.birth_date} onChange={onChange}/>
                                </Group>

                                <Group>
                                    <Label>No Telepon</Label>
                                    <Control type="text" placeholder="08xxxxxxx"  id="phone" value={createDoctorRequest.phone} onChange={onChange}/>
                                </Group>
                            </Col>

                            <Col>
                                <Group>
                                    <Label>Passfoto</Label>

                                    <InputFile id="picture"
                                        value={createDoctorRequest.picture}
                                        onChange={onChange}
                                        onDelete={onDelete}
                                        />
                                </Group>
                            </Col>
                            </Row>

                        <Bottom>
                            <CancelBTN to={generatePath(endpoints.doctor)}>Batal</CancelBTN>
                            <SubmitBTN type="submit">Kirim</SubmitBTN>
                        </Bottom>
                        </Formx>
                </Content>
            </Report>
        
        </Wrapper>

    )
}

export default AddDoctor