import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "@config/config"
import { statusActions } from "@store/status"
import endpoints from "@constants/endpoints/api"
import authHeader from "@utils/header"
import { Diagnosis } from "@models/Diagnosis"
import { objectToQueryString } from "@utils/urlHelper"

interface Request {
    limit: number
    offset: number
    search: string
}

export interface DiagnosisListResponse {
    data: Diagnosis[]
    hasPrevPage: boolean
    hasNextPage: boolean
}

export const GetDiagnosisListService = createAsyncThunk(
    endpoints.diagnosislist,
    async (request: Request, { dispatch }) => {
        try {
            dispatch(statusActions.setLoading(true))

            const response = await api.get(
                endpoints.diagnosislist + "?" + objectToQueryString(request),
                authHeader('application/json')
            )

            dispatch(statusActions.setLoading(false))

            const data = (response.data as DiagnosisListResponse)
            return data
        } catch (err) {
            alert(err)
            // handleError(err, dispatch)
        }
    }
)