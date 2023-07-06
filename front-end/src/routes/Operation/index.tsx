import { Wrapper, Header, IconAction, AddNew, Options, ActionButton, Search, SearchBar} from './Operation.styles'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '@store';
import { statusActions } from '@store/status';
import Page from '@components/Pagination';
import { generatePath, useNavigate } from 'react-router-dom';
import endpoints from '@constants/routes/admin';
import { parseDate } from '@utils/converter';
import { GetOperationListService, OperationListResponse } from '@services/operationlist';
import { usePermission } from '@hooks/usePermission';

const Operation = () => {
    const UpdateOperation = usePermission("Update Operation")
    const GetOperation = usePermission("Get Operation")
    const LIMIT = 10
    const [operations, setOperation] = useState<OperationListResponse>({
        data: [],
        hasPrevPage : false,
        hasNextPage : false,
    })
    
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (GetOperation) {
            onSearch()
        }
    }, [dispatch, currentPage, LIMIT, GetOperation])

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
            const res = await dispatch(GetOperationListService(request)).unwrap()
            if (res) setOperation(res)
        } catch(err) {
            dispatch(statusActions.setError((err as Error).message))
        }
    }

    useEffect(() => {
        if (!GetOperation) {
            const credentials = JSON.parse(localStorage.getItem("credentials") || "")
            const isPatient = credentials.accesses?.some((access: string) => access === "Patient")
            navigate(isPatient ? generatePath(endpoints.dashboard) : generatePath(endpoints.home))
        }
    }, [GetOperation])

    return (
    <Wrapper>
        <Header to="#patient">Operasi</Header>

        <Options>
            <SearchBar className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="text" placeholder="Cari" value={search} onChange={onChange} />
                <Search onClick={onSearch}>Cari</Search>
            </SearchBar>
            <AddNew to={generatePath(endpoints.addoperation)}>Buat Baru</AddNew>
        </Options>

        <Table responsive striped bordered hover>
        <thead>
            <tr>
            <th>No</th>
            <th>Tanggal Operasi<br/>(dd/mm/yyyy)</th>
            <th>Kode Operasi</th>
            <th>Nama Pasien</th>
            <th>NIK</th>
            <th>Jenis Kelamin</th>
            <th>Kota <br/>/Tempat Tinggal</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                operations.data.map((operation, index) => (
                    <tr key={index}>
                        <td>{ LIMIT*(currentPage-1)+index+1 }</td>
                        <td>{ parseDate(operation.created_at) }</td>
                        <td>{ operation.code}</td>
                        <td>{ operation.user?.name }</td>
                        <td>{ operation.user?.nik }</td>
                        <td>{ operation.user?.gender }</td>
                        <td>{ operation.user?.town }</td>
                        <td>
                        <ActionButton to={generatePath(endpoints.viewoperation, { operationId: operation.id })}>
                            <IconAction className="fa-regular fa-file-lines"></IconAction>
                        </ActionButton>
                        { UpdateOperation &&( 
                            <ActionButton to={generatePath(endpoints.editoperation, { operationId: operation.id })}>
                                <IconAction className="fa-solid fa-pen-to-square"></IconAction>
                            </ActionButton>
                        ) }
                        </td>
                    </tr>
                ))
            }
        </tbody>
        </Table>
        <Page currentPage={currentPage}
            hasPrevPage={operations.hasPrevPage}
            hasNextPage={operations.hasNextPage}
            onClick={setCurrentPage}
            />
    </Wrapper>
    );
}


export default Operation