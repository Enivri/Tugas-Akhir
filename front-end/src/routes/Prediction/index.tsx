import { Wrapper, Header, IconAction, AddNew, Options, ActionButton, Search, SearchBar} from './Prediction.styles'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '@store';
import { statusActions } from '@store/status';
import Page from '@components/Pagination';
import { generatePath } from 'react-router-dom';
import endpoints from '@constants/routes/admin';
import { parseDate } from '@utils/converter';
import { GetPredictionListService, PredictionListResponse } from '@services/predictionlist';

const Prediction = () => {
    const LIMIT = 10
    const [predictions, setPrediction] = useState<PredictionListResponse>({
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
            const res = await dispatch(GetPredictionListService(request)).unwrap()
            if (res) setPrediction(res)
        } catch(err) {
            dispatch(statusActions.setError((err as Error).message))
        }
    }

    return (
    <Wrapper>
        <Header to="#patient">Prediction</Header>

        <Options>
            <SearchBar className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="text" placeholder="Search" value={search} onChange={onChange} />
                <Search onClick={onSearch}>Search</Search>
            </SearchBar>
            <AddNew to={generatePath(endpoints.addprediction)}>Add New</AddNew>
        </Options>

        <Table responsive striped bordered hover>
        <thead>
            <tr>
            <th>No</th>
            <th>Tanggal Prediksi <br/>(dd/mm/yyyy)</th>
            <th>Nama Pasien</th>
            <th>NIK</th>
            <th>Jenis Kelamin</th>
            <th>Kota <br/>/Tempat Tinggal</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                predictions.data.map((prediction, index) => (
                    <tr key={index}>
                        <td>{ LIMIT*(currentPage-1)+index+1 }</td>
                        <td>{ parseDate(prediction.created_at) }</td>
                        <td>{ prediction.user.name }</td>
                        <td>{ prediction.user.nik }</td>
                        <td>{ prediction.user.gender }</td>
                        <td>{ prediction.user.town }</td>
                        <td>
                        <ActionButton to={generatePath(endpoints.viewprediction, { predictionId: prediction.id })}>
                            <IconAction className="fa-regular fa-file-lines"></IconAction>
                        </ActionButton>
                        <ActionButton to={generatePath(endpoints.editprediction, { predictionId: prediction.id })}>
                            <IconAction className="fa-solid fa-pen-to-square"></IconAction>
                        </ActionButton>
                        </td>
                    </tr>
                ))
            }
        </tbody>
        </Table>
        <Page currentPage={currentPage}
            hasPrevPage={predictions.hasPrevPage}
            hasNextPage={predictions.hasNextPage}
            onClick={setCurrentPage}
            />
    </Wrapper>
    );
}


export default Prediction