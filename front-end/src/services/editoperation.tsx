import { createAsyncThunk } from "@reduxjs/toolkit"
import { statusActions } from "@store/status"
import api from '@config/config'
import endpoints from '@constants/endpoints/api'
import authHeader from "@utils/header"
import { generatePath } from "react-router-dom"
import { upload } from "./upload"

export interface EditOperationParams {
    operationId: number
    code: string
    patient_id: number
    diagnosis_id: number
    right_eye_pic?: File
    left_eye_pic?: File
    result: string
    description: string
}

interface EditOperationRequest {
    code: string
    right_eye_pic?: string
    left_eye_pic?: string
    result: string
    description: string
}

export const EditOperationService = createAsyncThunk(
    endpoints.editoperation,
    async (params: EditOperationParams, { dispatch }) => {
        try {
            dispatch(statusActions.setLoading(true))

            const [right_eye_pic_url, left_eye_pic_url]= await Promise.all([
            dispatch(upload(params.right_eye_pic)).unwrap(),
            dispatch(upload(params.left_eye_pic)).unwrap(),
            ])

            const request: EditOperationRequest = {
                code: params.code,
                right_eye_pic: right_eye_pic_url,
                left_eye_pic: left_eye_pic_url,
                result: params.result,
                description: params.description
            }

            await api.put(
                generatePath(endpoints.editoperation, {operationId: params.operationId}),
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