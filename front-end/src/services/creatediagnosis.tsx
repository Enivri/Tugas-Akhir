import { createAsyncThunk } from "@reduxjs/toolkit"
import { statusActions } from "@store/status"
import api from '@config/config'
import endpoints from '@constants/endpoints/api'
import authHeader from "@utils/header"
import { AxiosError } from "axios"
import { upload } from "./upload"
import { Diagnosis } from "@models/Diagnosis"

export interface CreateDiagnosisRequest {
    nik: string
    right_eye_pic?: File
    left_eye_pic?: File
    right_eye_cond: string
    left_eye_cond: string
    description: string
}

export const CreateDiagnosisService = createAsyncThunk(
    endpoints.creatediagnosis,
    async (params: CreateDiagnosisRequest, { dispatch }) => {
        try {
            dispatch(statusActions.setLoading(true))

            const [right_eye_pic_url, left_eye_pic_url]= await Promise.all([
            dispatch(upload(params.right_eye_pic)).unwrap(),
            dispatch(upload(params.left_eye_pic)).unwrap(),
            ])
            const request = {
                ...params,
                right_eye_pic: right_eye_pic_url,
                left_eye_pic: left_eye_pic_url,

            }

            const response = await api.post(
                endpoints.creatediagnosis,
                {
                    ...request,
                    ...authHeader('application/json')
                }
            )
            const data = (response.data as Diagnosis)
            return data
        } catch (err) {
            // handleError(err, dispatch)
            console.log((err as AxiosError).response)
            throw Error("error")
        }
    }
)