import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "@config/config"
import { statusActions } from "@store/status"
import endpoints from "@constants/endpoints/api"
import authHeader from "@utils/header"
import { Prediction } from "@models/Prediction"
import { objectToQueryString } from "@utils/urlHelper"

interface Request {
    limit: number
    offset: number
}

export interface PatientPredictionListResponse {
    data: Prediction[]
    hasPrevPage: boolean
    hasNextPage: boolean
}

export const GetPatientPredictionListService = createAsyncThunk(
    endpoints.predictionlist,
    async (request: Request, { dispatch }) => {
        try {
            dispatch(statusActions.setLoading(true))

            const response = await api.get(
                endpoints.patientpredictionlist + "?" + objectToQueryString(request),
                authHeader('application/json')
            )

            dispatch(statusActions.setLoading(false))

            const data = (response.data as PatientPredictionListResponse)
            return data
        } catch (err) {
            alert(err)
            // handleError(err, dispatch)
        }
    }
)