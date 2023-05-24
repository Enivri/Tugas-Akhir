import { Wrapper, Header, IconAction, AddNew, Options, ActionButton, Search, SearchBar} from './Patient.styles'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '@store';
import { GetUserListService, Response } from '@services/userlist';
import { Role } from '@models/User';
import { statusActions } from '@store/status';
import Page from '@components/Pagination';
import { generatePath } from 'react-router-dom';
import endpoints from '@constants/routes/admin';
import { parseDate } from '@utils/converter';
import { request } from 'http';

const  Patient = () => {
    const LIMIT = 10
    const [users, setUsers] = useState<Response>({
        data: [],
        hasPrevPage : false,
        hasNextPage : false,
    })
    
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")

    const dispatch = useAppDispatch()
    useEffect(() => {
        onSearch()
    }, [dispatch, currentPage, LIMIT])
    
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget as HTMLInputElement
        setSearch(value)
    }

    const onSearch = async () =>{
        try{
            const request = {
                role: "patient" as Role,
                search: search,
                offset: currentPage,
                limit: LIMIT,
            }
            const res = await dispatch(GetUserListService(request)).unwrap()
            if (res) setUsers(res)
        } catch(err) {
            dispatch(statusActions.setError((err as Error).message))
        }
    }

    return (
    <Wrapper>
        <Header to="#patient">Patient</Header>

        <Options>
                <SearchBar className="mb-3" controlId="exampleForm.ControlInput1" >
                    <Form.Control type="text" placeholder="Search" value={search} onChange={onChange} />
                    <Search onClick={onSearch}>Search</Search>
                </SearchBar>
            <AddNew to={generatePath(endpoints.addpatient)}>Add New</AddNew>
        </Options>

        <Table striped bordered hover>
        <thead>
            <tr>
            <th>No</th>
            <th>Terdaftar Tanggal <br/>(dd/mm/yyyy)</th>
            <th>Nama Pasien</th>
            <th>NIK</th>
            <th>Tanggal Lahir <br/>(dd/mm/yyyy)</th>
            <th>Jenis Kelamin</th>
            <th>Nomor Telepon</th>
            <th>Kota <br/>/Tempat Tinggal</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                users.data.map((user, index) => (
                    <tr key={index}>
                        <td>{ LIMIT*(currentPage-1)+index+1 }</td>
                        <td>{ parseDate(user.created_at) }</td>
                        <td>{ user.name }</td>
                        <td>{ user.nik }</td>
                        <td>{ parseDate(user.birth_date) }</td> 
                        <td>{ user.gender }</td>
                        <td>{ user.phone }</td>
                        <td>{ user.town }</td>
                        <td>
                        <ActionButton to={generatePath(endpoints.viewpatient, { userId: user.id })}>
                            <IconAction className="fa-regular fa-file-lines"></IconAction>
                        </ActionButton>
                        <ActionButton to={generatePath(endpoints.editpatient, { userId: user.id })}>
                            <IconAction className="fa-solid fa-pen-to-square"></IconAction>
                        </ActionButton>
                        </td>
                    </tr>
                ))
            }
        </tbody>
        </Table>
        <Page currentPage={currentPage}
            hasPrevPage={users.hasPrevPage}
            hasNextPage={users.hasNextPage}
            onClick={setCurrentPage}
            />
    </Wrapper>
    );
}


export default Patient