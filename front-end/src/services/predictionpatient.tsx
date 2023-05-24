import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "@config/config"
import { statusActions } from "@store/status"
import endpoints from "@constants/endpoints/api"
import { objectToQueryString } from "@utils/urlHelper"
// import authHeader from "@services/authHeader"
// import handleError from "@services/errorHandling"
// import { generatePath } from "react-router-dom"
import { Prediction } from "@models/Prediction"
import authHeader from "@utils/header"

interface Request {
    patient_id: string
    limit: number
    offset: number
}

export interface PredictionPatientResponse {
    data: Prediction[]
    hasPrevPage: boolean
    hasNextPage: boolean
}

export const GetPredictionPatientService = createAsyncThunk(
    endpoints.predictionpatient,
    async (request: Request, { dispatch }) => {
        try {
            dispatch(statusActions.setLoading(true))

            const response = await api.get(
                endpoints.predictionpatient + "?" + objectToQueryString(request), // /api/v1/predictions?patient_id=id
                authHeader('application/json')
            )

            dispatch(statusActions.setLoading(false))

            const data = (response.data as PredictionPatientResponse)
            return data
        } catch (err) {
            alert(err)
            // handleError(err, dispatch)
        }
    }
)