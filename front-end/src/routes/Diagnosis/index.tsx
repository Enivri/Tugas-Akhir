import { Wrapper, Header, IconAction, AddNew, Options, ActionButton, Search, SearchBar} from './Diagnosis.styles'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '@store';
import { statusActions } from '@store/status';
import Page from '@components/Pagination';
import { generatePath, useNavigate } from 'react-router-dom';
import endpoints from '@constants/routes/admin';
import { parseDate } from '@utils/converter';
import { DiagnosisListResponse, GetDiagnosisListService } from '@services/diagnosislist';
import { usePermission } from '@hooks/usePermission';

const Diagnosis = () => {
    const UpdateDiagnosis = usePermission("Update Diagnosis")
    const GetDiagnosis = usePermission("Get Diagnosis")
    const LIMIT = 10
    const [diagnosis, setDiagnosis] = useState<DiagnosisListResponse>({
        data: [],
        hasPrevPage : false,
        hasNextPage : false,
    })
    
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (GetDiagnosis) {
            onSearch()
        }
    }, [dispatch, currentPage, LIMIT, GetDiagnosis])
    
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
            const res = await dispatch(GetDiagnosisListService(request)).unwrap()
            if (res) setDiagnosis(res)
        } catch(err) {
            dispatch(statusActions.setError((err as Error).message))
        }
    }

    useEffect(() => {
        if (!GetDiagnosis) {
            const credentials = JSON.parse(localStorage.getItem("credentials") || "")
            const isPatient = credentials.accesses?.some((access: string) => access === "Patient")
            navigate(isPatient ? generatePath(endpoints.dashboard) : generatePath(endpoints.home))
        }
    }, [GetDiagnosis])

    return (
    <Wrapper>
        <Header to="#patient">Diagnosa</Header>

        <Options>
            <SearchBar className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="text" placeholder="Cari" value={search} onChange={onChange} />
                <Search onClick={onSearch}>Cari</Search>
            </SearchBar>
            <AddNew to={generatePath(endpoints.adddiagnosis)}>Buat Baru</AddNew>
        </Options>

        <Table responsive striped bordered hover>
        <thead>
            <tr>
            <th>No</th>
            <th>Tanggal Diagnosa <br/>(dd/mm/yyyy)</th>
            <th>Kode Diagnosa</th>
            <th>Nama Pasien</th>
            <th>NIK</th>
            <th>Jenis Kelamin</th>
            <th>Kota <br/>/Tempat Tinggal</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                diagnosis.data.map((diagnosis, index) => (
                    <tr key={index}>
                        <td>{ LIMIT*(currentPage-1)+index+1 }</td>
                        <td>{ parseDate(diagnosis.created_at) }</td>
                        <td>{ diagnosis.code}</td>
                        <td>{ diagnosis.user?.name }</td>
                        <td>{ diagnosis.user?.nik }</td>
                        <td>{ diagnosis.user?.gender }</td>
                        <td>{ diagnosis.user?.town }</td>
                        <td>
                        <ActionButton to={generatePath(endpoints.viewdiagnosis, { diagnosisId: diagnosis.id })}>
                            <IconAction className="fa-regular fa-file-lines"></IconAction>
                        </ActionButton>
                        { UpdateDiagnosis &&( 
                            <ActionButton to={generatePath(endpoints.editdiagnosis, { diagnosisId: diagnosis.id })}>
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
            hasPrevPage={diagnosis.hasPrevPage}
            hasNextPage={diagnosis.hasNextPage}
            onClick={setCurrentPage}
            />
    </Wrapper>
    );
}


export default Diagnosis