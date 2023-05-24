import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "@config/config"
import { statusActions } from "@store/status"
import endpoints from "@constants/endpoints/api"
import { Diagnosis } from "@models/Diagnosis"
import { generatePath } from "react-router-dom"
import authHeader from "@utils/header";

interface Request {
    diagnosisId: string
}

export interface GetDiagnosisResponse {
    data: Diagnosis
}

export const GetDiagnosisService = createAsyncThunk(
    endpoints.viewdiagnosis,
    async (request: Request, { dispatch }) => {
        try {
            dispatch(statusActions.setLoading(true))

            const response = await api.get(
                generatePath(endpoints.viewdiagnosis, {diagnosisId: request.diagnosisId}), // /api/v1/users/1
                authHeader('application/json')
            )

            dispatch(statusActions.setLoading(false))

            const data = (response.data as GetDiagnosisResponse)
            return data.data
        } catch (err) {
            alert(err)
            // handleError(err, dispatch)
        }
    }
)