import React, { } from 'react'
import { Wrapper, Report, ReportTitle, Content, SubTitle, Identity, Pasfoto, SubContent, Titlespace, Eyes, EyesCard } from './ViewPrediction.styles'
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@store';
import { statusActions } from '@store/status';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { parseDate } from '@utils/converter';
import { GetPredictionService } from '@services/viewprediction';
import { Prediction } from '@models/Prediction';
import endpoints from '@constants/routes/admin';
import { usePermission } from '@hooks/usePermission';

type Params = {
    predictionId: string
}

const ViewPrediction = () => {
    const GetPrediction = usePermission("Get Prediction")
    const [prediction, setPrediction] = useState<Prediction>({        
            id: 0,
            patient_id: 0,
            right_eye_pic: "",
            left_eye_pic: "",
            right_eye_cond: "",
            left_eye_cond:"",
            created_at: "",
            user: undefined,
})
    
    const params = useParams<Params>()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    useEffect(() => {
        const fetchData = async () =>{
            try{
                const request = {
                    predictionId: params.predictionId || "",
                }
                const res = await dispatch(GetPredictionService(request)).unwrap()
                if (res) setPrediction(res)
                console.log(res)
            } catch(err) {
                dispatch(statusActions.setError((err as Error).message))
            }
        }
        if (GetPrediction) {
            fetchData()
        }
    }, [dispatch, GetPrediction])

    useEffect(() => {
        if (!GetPrediction) {
            const credentials = JSON.parse(localStorage.getItem("credentials") || "")
            const isPatient = credentials.accesses?.some((access: string) => access === "Patient")
            navigate(isPatient ? generatePath(endpoints.dashboard) : generatePath(endpoints.home))
        }
    }, [GetPrediction])

    return (
        <Wrapper>
            <Report>
                <ReportTitle>Detail Prediksi</ReportTitle>
                <Content>
                    <Identity>
                            <SubTitle>
                                Identitas Pasien
                            </SubTitle>
                            
                            <SubContent>
                                <Titlespace>Nama Lengkap </Titlespace>
                                <p>:</p>
                                <p>{ prediction?.user?.name }</p>
                            </SubContent>
                            <SubContent>
                                <Titlespace>NIK </Titlespace>
                                <p>:</p>
                                <p>{ prediction?.user?.nik }</p>
                            </SubContent>
                            <SubContent>
                                <Titlespace>Tanggal Lahir <br/>(dd/mm/yyyy)</Titlespace>
                                <p>:</p>
                                <p>{ parseDate(prediction?.user?.birth_date ?? "") }</p>
                            </SubContent>
                            <SubContent>
                                <Titlespace>Kota</Titlespace>
                                <p>:</p>
                                <p>{ prediction?.user?.town }</p>
                            </SubContent>
                            <SubContent>
                                <Titlespace>Jenis kelamin </Titlespace>
                                <p>:</p>
                                <p>{ prediction?.user?.gender }</p>
                            </SubContent>
                            <SubContent>
                                <Titlespace>No. Telpon </Titlespace>
                                <p>:</p>
                                <p>{ prediction?.user?.phone ?? ""}</p>
                            </SubContent>

                    </Identity>

                    <Eyes>
                        <EyesCard>
                            <p>Mata Kanan</p>
                            <Pasfoto src={prediction?.right_eye_pic} alt="Image eror" />
                            <p>Kondisi: {prediction?.right_eye_cond}</p>
                        </EyesCard>

                        <EyesCard>
                            <p>Mata Kiri</p>
                            <Pasfoto src={prediction?.left_eye_pic} alt="Image eror" />
                            <p>Kondisi: {prediction?.left_eye_cond}</p>
                        </EyesCard>
                    </Eyes>

                </Content>


            </Report>
        
        </Wrapper>

    )
}

export default ViewPrediction