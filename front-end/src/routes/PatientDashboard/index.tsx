import { Wrapper, Header, AddNew, Options, SubCode, SubTitle, PagePosition, Content} from './PatientDashboard.styles'
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@store';
import { statusActions } from '@store/status';
import Page from '@components/Pagination';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import endpoints from '@constants/routes/admin';
import { parseDate } from '@utils/converter';
import PatientCardComponent from '@components/PatientCard';
import { GetPatientPredictionListService, PatientPredictionListResponse } from '@services/patientpredictionlist';
import { usePermission } from '@hooks/usePermission';

const  Patient = () => {
    const Patient = usePermission("Patient")
    const LIMIT = 4
    const [patientPredictionList, setPatientPredictionList] = useState<PatientPredictionListResponse>({
        data: [],
        hasPrevPage : false,
        hasNextPage : false,
    })

    const [currentPage, setCurrentPage] = useState(1)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchData = async () =>{
            try{
                const request = {
                    offset: currentPage,
                    limit: LIMIT,
                }
                const res = await dispatch(GetPatientPredictionListService(request)).unwrap() 
                if (res) setPatientPredictionList(res)
            } catch(err) {
                dispatch(statusActions.setError((err as Error).message))
            }
        }
        if (Patient) {
            fetchData()
        }
    }, [dispatch, currentPage, LIMIT, Patient])

    useEffect(() => {
        if (!Patient) {
            const credentials = JSON.parse(localStorage.getItem("credentials") || "")
            const isPatient = credentials.accesses?.some((access: string) => access === "Patient")
            navigate(isPatient ? generatePath(endpoints.dashboard) : generatePath(endpoints.home))
        }
    }, [Patient])

    return (
    <Wrapper>
        <Header to="#patient">Dashboard</Header>

        <Options>
            <AddNew to={generatePath(endpoints.addtrial)}>Buat Baru</AddNew>
        </Options>
        
        <Content>
            <SubTitle> Riwayat : </SubTitle>
            <SubCode>
                {patientPredictionList.data.map((data) => (
                    <PatientCardComponent 
                    date={parseDate(data.created_at)} 
                    right={data.right_eye_cond} 
                    left={data.left_eye_cond} 
                    viewlink={generatePath(endpoints.viewprediction, { predictionId: data.id })}/>
                ))}
            </SubCode>
        </Content>

        <PagePosition>
            <Page currentPage={currentPage}
                hasPrevPage={patientPredictionList.hasPrevPage}
                hasNextPage={patientPredictionList.hasNextPage}
                onClick={setCurrentPage}
                />
        </PagePosition>
    </Wrapper>
    );
}


export default Patient