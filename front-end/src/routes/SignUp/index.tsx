import { Wrapper, Title, Label, Control, Group, Content, Bottom, SubmitBTN, CancelBTN, BackgroundImage, SignInForm, Colx} from './SignUp.styles'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { ChangeEvent, useState } from 'react'
import { useAppDispatch } from '@store'
import { generatePath, useNavigate } from 'react-router-dom'
import { CreatePatientRequest, CreatePatientService } from '@services/createpatient';
import { statusActions } from '@store/status';
import InputFile from '@components/InputFile';
import Image from '@assets/background.jpg'
import endpoints from '@constants/routes/admin';

const AddPatient = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [createPatientRequest, setCreatePatientRequest] = useState<CreatePatientRequest>({
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
        e.preventDefault()
        try{
            await dispatch(CreatePatientService(createPatientRequest)).unwrap()
            navigate(generatePath(endpoints.patient))

        } catch(err) {
            alert((err as Error).message)
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
                setCreatePatientRequest((prev) => ({
                    ...prev,
                    picture: newImages[0],
                }))
                break
            default:
                setCreatePatientRequest((prev) => ({
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
                setCreatePatientRequest((prev) => ({
                    ...prev,
                    picture: undefined,
                }))
                break
        }
    }


    return (
        <Wrapper>
        <BackgroundImage src={Image} alt="background-logo" />
            <Content>
                <Title>SIGN UP!</Title>
                <SignInForm onSubmit={onSubmit}>
                    <Row>
                        <Colx>                        
                            <Group>
                                <Label>Nama Lengkap</Label>
                                <Control type="text" placeholder="Nama Lengkap" id="name" value={createPatientRequest.name} onChange={onChange}/>
                            </Group>

                            <Group>
                                <Label>NIK</Label>
                                <Control type="text" placeholder="NIK" id="nik" value={createPatientRequest.nik} onChange={onChange}/>
                            </Group>

                            <Group>
                                <Label>Email</Label>
                                <Control type="email" placeholder="name@example.com"  id="email" value={createPatientRequest.email} onChange={onChange}/>
                            </Group>

                            <Group>
                                <Label>Password</Label>
                                <Control type="password" placeholder="*********"  id="password" value={createPatientRequest.password} onChange={onChange}/>
                            </Group>

                            <Group>
                                <Label>Tempat Tinggal</Label>
                                <Control type="text" placeholder="Kota"  id="town" value={createPatientRequest.town} onChange={onChange}/>
                            </Group>

                            <Group>
                                <Label>Jenis kelamin</Label>
                                <Control type="text" placeholder="male/female" id="gender" value={createPatientRequest.gender} onChange={onChange}/>
                            </Group>

                            <Group>
                                <Label>Tanggal Lahir <br/>(dd/mm/yyyy)</Label>
                                <Control type="date" placeholder="dd-mm-yyyy"  id="birth_date" value={createPatientRequest.birth_date} onChange={onChange}/>
                            </Group>

                            <Group>
                                <Label>No Telepon</Label>
                                <Control type="text" placeholder="08xxxxxxx"  id="phone" value={createPatientRequest.phone} onChange={onChange}/>
                            </Group>
                        </Colx>

                        <Colx>
                            <Group>
                                <Label>Passfoto</Label>

                                <InputFile id="picture"
                                    value={createPatientRequest.picture}
                                    onChange={onChange}
                                    onDelete={onDelete}
                                />
                            </Group>
                        </Colx>
                    </Row>

                    <Bottom>
                        <CancelBTN to="/patient">Batal</CancelBTN>
                        <SubmitBTN type="submit">Kirim</SubmitBTN>
                    </Bottom>
                </SignInForm>
            </Content>         

        </Wrapper>

    )
}

export default AddPatient