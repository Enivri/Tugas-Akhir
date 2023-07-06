import { createAsyncThunk } from "@reduxjs/toolkit"
import { statusActions } from "@store/status"
import api from '@config/config'
import endpoints from '@constants/endpoints/api'
import authHeader from "@utils/header"
import { AxiosError } from "axios"
import { upload } from "./upload"
import { Prediction } from "@models/Prediction"

export interface CreateTrialRequest {
    right_eye_pic?: File
    left_eye_pic?: File
}

export const CreateTrialService = createAsyncThunk(
    endpoints.createtrial,
    async (params: CreateTrialRequest, { dispatch }) => {
        try {
            dispatch(statusActions.setLoading(true))

            const [right_eye_pic_url, left_eye_pic_url]= await Promise.all([
            dispatch(upload(params.right_eye_pic)).unwrap(),
            dispatch(upload(params.left_eye_pic)).unwrap(),
            ])
            const request = {
                right_eye_pic: right_eye_pic_url,
                left_eye_pic: left_eye_pic_url,

            }

            const response = await api.post(
                endpoints.createtrial,
                request, 
                authHeader("application/json"),
            )
            const data = (response.data as Prediction)
            return data
        } catch (err) {
            // handleError(err, dispatch)
            console.log((err as AxiosError).response)
            throw Error("error")
        }
    }
)