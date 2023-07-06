import { createAsyncThunk } from "@reduxjs/toolkit"
import { statusActions } from "@store/status"
import api from '@config/config'
import endpoints from '@constants/endpoints/api'
import authHeader from "@utils/header"
import { generatePath } from "react-router-dom"
import { upload } from "./upload"

export interface EditCheckUpParams {
    checkupId: number
    operation_code: string
    patient_id: number
    operation_id: number
    right_eye_pic?: File
    left_eye_pic?: File
    description: string
}

interface EditCheckUpRequest {
    operation_code: string
    right_eye_pic?: string
    left_eye_pic?: string
    description: string
}

export const EditCheckUpService = createAsyncThunk(
    endpoints.editcheckup,
    async (params: EditCheckUpParams, { dispatch }) => {
        try {
            dispatch(statusActions.setLoading(true))

            const [right_eye_pic_url, left_eye_pic_url]= await Promise.all([
            dispatch(upload(params.right_eye_pic)).unwrap(),
            dispatch(upload(params.left_eye_pic)).unwrap(),
            ])

            const request: EditCheckUpRequest = {
                operation_code: params.operation_code,
                right_eye_pic: right_eye_pic_url,
                left_eye_pic: left_eye_pic_url,
                description: params.description
            }

            await api.put(
                generatePath(endpoints.editcheckup, {checkupId: params.checkupId}),
                request, 
                authHeader("application/json"),
                // request,
            )
        } catch (err) {
            // handleError(err, dispatch)
        }
    }
)