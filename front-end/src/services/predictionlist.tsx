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
    search: string
}

export interface PredictionListResponse {
    data: Prediction[]
    hasPrevPage: boolean
    hasNextPage: boolean
}

export const GetPredictionListService = createAsyncThunk(
    endpoints.predictionlist,
    async (request: Request, { dispatch }) => {
        try {
            dispatch(statusActions.setLoading(true))

            const response = await api.get(
                endpoints.predictionlist + "?" + objectToQueryString(request),
                authHeader('application/json')
            )

            dispatch(statusActions.setLoading(false))

            const data = (response.data as PredictionListResponse)
            return data
        } catch (err) {
            alert(err)
            // handleError(err, dispatch)
        }
    }
)