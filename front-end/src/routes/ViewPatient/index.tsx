import React, { } from 'react'
import { Wrapper, Report, ReportTitle, Content, SubTitle, Identity, Pasfoto, Kode, SubContent, SubCode, Titlespace, PagePosition, ImageDiv } from './ViewPatient.styles'
import Col from 'react-bootstrap/Col';
import CodeCardComponent from '@components/CodeCard';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@store';
import { statusActions } from '@store/status';
import { GetUserService, Response } from '@services/viewuser';
import Page from '@components/Pagination';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { parseDate } from '@utils/converter';
import { GetPredictionPatientService, PredictionPatientResponse } from '@services/predictionpatient';
import { DiagnosisPatientResponse, GetDiagnosisPatientService } from '@services/diagnosispatient';
import { GetOperationPatientService, OperationPatientResponse } from '@services/operationpatient';
import { CheckUpPatientResponse, GetCheckUpPatientService } from '@services/checkuppatient';
import endpoints from '@constants/routes/admin';
import { usePermission } from '@hooks/usePermission';

type Params = {
    userId: string
}

const ViewPatient = () => {
    const GetPatient = usePermission("Get Patient")
    const GetPrediction = usePermission("Get Prediction")
    const GetDiagnosis = usePermission("Get Diagnosis")
    const GetOperation = usePermission("Get Operation")
    const GetCheckUp = usePermission("Get CheckUp")
    const LIMIT = 3
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
            picture: "",
            role: "",
            created_at: "",
        },
    })
    
    const [currentPage, setCurrentPage] = useState(1)
    const params = useParams<Params>()

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    useEffect(() => {
        const fetchData = async () =>{
            try{
                const request = {
                    userId: params.userId || "",
                }
                const res = await dispatch(GetUserService(request)).unwrap()
                if (res) setUser(res)
            } catch(err) {
                dispatch(statusActions.setError((err as Error).message))
            }
        }
        if (GetPatient) {
            fetchData()
        }
    }, [dispatch, GetPatient])

    const [predictionList, setPredictionList] = useState<PredictionPatientResponse>({
        data: [],
        hasPrevPage : false,
        hasNextPage : false,
    })

    useEffect(() => {
        const fetchData = async () =>{
            try{
                const request = {
                    patient_id: params.userId || "",
                    offset: currentPage,
                    limit: LIMIT,
                }
                const res = await dispatch(GetPredictionPatientService(request)).unwrap() 
                if (res) setPredictionList(res)
            } catch(err) {
                dispatch(statusActions.setError((err as Error).message))
            }
        }
        if (GetPrediction) {
            fetchData()
        }
    }, [dispatch, params, currentPage, LIMIT, GetPrediction])

    const [diagnosisList, setDiagnosisList] = useState<DiagnosisPatientResponse>({
        data: [],
        hasPrevPage : false,
        hasNextPage : false,
    })

    useEffect(() => {
        const fetchData = async () =>{
            try{
                const request = {
                    patient_id: params.userId || "",
                    offset: currentPage,
                    limit: LIMIT,
                }
                const res = await dispatch(GetDiagnosisPatientService(request)).unwrap() 
                if (res) setDiagnosisList(res)
            } catch(err) {
                dispatch(statusActions.setError((err as Error).message))
            }
        }
        if (GetDiagnosis) {
            fetchData()
        }
    }, [dispatch, params, currentPage, LIMIT, GetDiagnosis])

    const [operationList, setOperationList] = useState<OperationPatientResponse>({
        data: [],
        hasPrevPage : false,
        hasNextPage : false,
    })

    useEffect(() => {
        const fetchData = async () =>{
            try{
                const request = {
                    patient_id: params.userId || "",
                    offset: currentPage,
                    limit: LIMIT,
                }
                const res = await dispatch(GetOperationPatientService(request)).unwrap() 
                if (res) setOperationList(res)
            } catch(err) {
                dispatch(statusActions.setError((err as Error).message))
            }
        }
        if (GetOperation) {
            fetchData()
        }
    }, [dispatch, params, currentPage, GetOperation])

    const [checkUpList, setCheckUpList] = useState<CheckUpPatientResponse>({
        data: [],
        hasPrevPage : false,
        hasNextPage : false,
    })

    useEffect(() => {
        const fetchData = async () =>{
            try{
                const request = {
                    patient_id: params.userId || "",
                    offset: currentPage,
                    limit: LIMIT,
                }
                const res = await dispatch(GetCheckUpPatientService(request)).unwrap() 
                if (res) setCheckUpList(res)
            } catch(err) {
                dispatch(statusActions.setError((err as Error).message))
            }
        }
        if (GetCheckUp) {
            fetchData()
        }
    }, [dispatch, params, currentPage, LIMIT, GetCheckUp])

    useEffect(() => {
        if (!GetPatient && !GetPrediction && !GetDiagnosis && !GetOperation && !GetCheckUp) {
            const credentials = JSON.parse(localStorage.getItem("credentials") || "")
            const isPatient = credentials.accesses?.some((access: string) => access === "Patient")
            navigate(isPatient ? generatePath(endpoints.dashboard) : generatePath(endpoints.home))
        }
    }, [GetPatient, GetPrediction, GetDiagnosis, GetOperation, GetCheckUp])

    return (
        <Wrapper>
            <Report>
                <ReportTitle>Detail Pasien</ReportTitle>
                <Content>
                    <Identity>
                        <Col>           
                            <SubTitle>
                                Identitas Pasien
                            </SubTitle>
                            
                            <SubContent>
                                <Titlespace>Nama Lengkap </Titlespace>
                                <p>:</p>
                                <p>{ user.data.name }</p>
                            </SubContent>
                            <SubContent>
                                <Titlespace>NIK </Titlespace>
                                <p>:</p>
                                <p>{ user.data.nik }</p>
                            </SubContent>
                            <SubContent>
                                <Titlespace>Tanggal Lahir <br/>(dd/mm/yyyy)</Titlespace>
                                <p>:</p>
                                <p>{ parseDate(user.data.birth_date) }</p>
                            </SubContent>
                            <SubContent>
                                <Titlespace>Kota</Titlespace>
                                <p>:</p>
                                <p>{ user.data.town }</p>
                            </SubContent>
                            <SubContent>
                                <Titlespace>Jenis kelamin </Titlespace>
                                <p>:</p>
                                <p>{ user.data.gender }</p>
                            </SubContent>
                            <SubContent>
                                <Titlespace>No. Telpon </Titlespace>
                                <p>:</p>
                                <p>{ user.data.phone }</p>
                            </SubContent>
                        </Col>
                        
                        <ImageDiv>
                            <Pasfoto src={user.data.picture} alt="Image eror" />
                        </ImageDiv>
                    </Identity>

                    <Kode>       
                        <SubTitle>
                            Predisksi :
                        </SubTitle>
                        <SubCode>
                        {
                            predictionList.data.map((data) => (
                                <CodeCardComponent code={""} date={parseDate(data.created_at)} viewlink={generatePath(endpoints.viewprediction, { predictionId: data.id })}/>
                            ))
                        }
                        </SubCode>
                        <PagePosition>
                        <Page currentPage={currentPage}
                            hasPrevPage={predictionList.hasPrevPage}
                            hasNextPage={predictionList.hasNextPage}
                            onClick={setCurrentPage}
                            />
                        </PagePosition>

                        <SubTitle>
                            Diagnosa :
                        </SubTitle>
                        <SubCode>
                        {
                            diagnosisList.data.map((data) => (
                                <CodeCardComponent code={data.code} date={parseDate(data.created_at)} viewlink={generatePath(endpoints.viewdiagnosis, { diagnosisId: data.id })}/>
                            ))
                        }
                        </SubCode>
                        <PagePosition>
                        <Page currentPage={currentPage}
                            hasPrevPage={diagnosisList.hasPrevPage}
                            hasNextPage={diagnosisList.hasNextPage}
                            onClick={setCurrentPage}
                            />
                        </PagePosition>


                        <SubTitle>
                            Operasi :
                        </SubTitle>
                        <SubCode>
                        {
                            operationList.data.map((data) => (
                                <CodeCardComponent code={data.code} date={parseDate(data.created_at)} viewlink={generatePath(endpoints.viewoperation, { operationId: data.id })}/>
                            ))
                        }
                        </SubCode>
                        <PagePosition>
                        <Page currentPage={currentPage}
                            hasPrevPage={operationList.hasPrevPage}
                            hasNextPage={operationList.hasNextPage}
                            onClick={setCurrentPage}
                            />
                        </PagePosition>

                        <SubTitle>
                            Check Up :
                        </SubTitle>
                        <SubCode>
                        {
                            checkUpList.data.map((data) => (
                                <CodeCardComponent code={""} date={parseDate(data.created_at)} viewlink={generatePath(endpoints.viewcheckup, { checkupId: data.id })}/>
                            ))
                        }
                        </SubCode>
                        <PagePosition>
                        <Page currentPage={currentPage}
                            hasPrevPage={checkUpList.hasPrevPage}
                            hasNextPage={checkUpList.hasNextPage}
                            onClick={setCurrentPage}
                            />
                        </PagePosition>
                    </Kode>
                </Content>


            </Report>
        
        </Wrapper>

    )
}

export default ViewPatient