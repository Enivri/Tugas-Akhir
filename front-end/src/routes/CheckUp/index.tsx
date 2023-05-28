import { Wrapper, Header, IconAction, AddNew, Options, ActionButton, Search, SearchBar} from './CheckUp.styles'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '@store';
import { statusActions } from '@store/status';
import Page from '@components/Pagination';
import { generatePath } from 'react-router-dom';
import endpoints from '@constants/routes/admin';
import { parseDate } from '@utils/converter';
import { CheckUpListResponse, GetCheckUpListService } from '@services/checkuplist';

const CheckUp = () => {
    const LIMIT = 10
    const [checkUps, setCheckUp] = useState<CheckUpListResponse>({
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
                search: search,
                offset: currentPage,
                limit: LIMIT,
            }
            const res = await dispatch(GetCheckUpListService(request)).unwrap()
            if (res) setCheckUp(res)
        } catch(err) {
            dispatch(statusActions.setError((err as Error).message))
        }
    }

    return (
    <Wrapper>
        <Header to="#patient">CheckUp</Header>

        <Options>
            <SearchBar className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="text" placeholder="Search" value={search} onChange={onChange} />
                <Search onClick={onSearch}>Search</Search>
            </SearchBar>
            <AddNew to={generatePath(endpoints.addcheckup)}>Add New</AddNew>
        </Options>

        <Table responsive striped bordered hover>
        <thead>
            <tr>
            <th>No</th>
            <th>Tanggal CheckUp <br/>(dd/mm/yyyy)</th>
            <th>Kode Operation</th>
            <th>Nama Pasien</th>
            <th>NIK</th>
            <th>Jenis Kelamin</th>
            <th>Kota <br/>/Tempat Tinggal</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                checkUps.data.map((checkUp, index) => (
                    <tr key={index}>
                        <td>{ LIMIT*(currentPage-1)+index+1 }</td>
                        <td>{ parseDate(checkUp.created_at) }</td>
                        <td>{ checkUp.operation?.code}</td>
                        <td>{ checkUp.user?.name }</td>
                        <td>{ checkUp.user?.nik }</td>
                        <td>{ checkUp.user?.gender }</td>
                        <td>{ checkUp.user?.town }</td>
                        <td>
                        <ActionButton to={generatePath(endpoints.viewcheckup, { checkupId: checkUp.id })}>
                            <IconAction className="fa-regular fa-file-lines"></IconAction>
                        </ActionButton>
                        <ActionButton to={generatePath(endpoints.editcheckup, { checkupId: checkUp.id })}>
                            <IconAction className="fa-solid fa-pen-to-square"></IconAction>
                        </ActionButton>
                        </td>
                    </tr>
                ))
            }
        </tbody>
        </Table>
        <Page currentPage={currentPage}
            hasPrevPage={checkUps.hasPrevPage}
            hasNextPage={checkUps.hasNextPage}
            onClick={setCurrentPage}
            />
    </Wrapper>
    );
}


export default CheckUp