import { createAsyncThunk } from "@reduxjs/toolkit"
import { statusActions } from "@store/status"
import api from '@config/config'
import endpoints from '@constants/endpoints/api'
import authHeader from "@utils/header"
import { generatePath } from "react-router-dom"
import { upload } from "./upload"

export interface EditPredictionParams {
    predictionId: number
    patient_id: number
    nik: string
    right_eye_pic?: File
    left_eye_pic?: File
    right_eye_cond: string
    left_eye_cond: string
}

interface EditPredictionRequest {
    nik: string
    right_eye_pic?: string
    left_eye_pic?: string
    right_eye_cond: string
    left_eye_cond: string
}

export const EditPredictionService = createAsyncThunk(
    endpoints.editprediction,
    async (params: EditPredictionParams, { dispatch }) => {
        try {
            dispatch(statusActions.setLoading(true))

            const [right_eye_pic_url, left_eye_pic_url]= await Promise.all([
            dispatch(upload(params.right_eye_pic)).unwrap(),
            dispatch(upload(params.left_eye_pic)).unwrap(),
            ])

            const request: EditPredictionRequest = {
                nik: params.nik,
                right_eye_pic: right_eye_pic_url,
                left_eye_pic: left_eye_pic_url,
                right_eye_cond: params.right_eye_cond,
                left_eye_cond: params.left_eye_cond,
            }

            await api.put(
                generatePath(endpoints.editprediction, {predictionId: params.predictionId}),
                {
                    ...request,
                    ...authHeader('application/json'),
                }
                // request,
            )
        } catch (err) {
            // handleError(err, dispatch)
        }
    }
)