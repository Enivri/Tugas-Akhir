import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "@config/config"
import { statusActions } from "@store/status"
import endpoints from "@constants/endpoints/api"
import { Prediction } from "@models/Prediction"
import { generatePath } from "react-router-dom"
import authHeader from "@utils/header";

interface Request {
    predictionId: string
}

export interface GetPredictionResponse {
    data: Prediction
}

export const GetPredictionService = createAsyncThunk(
    endpoints.viewprediction,
    async (request: Request, { dispatch }) => {
        try {
            dispatch(statusActions.setLoading(true))

            const response = await api.get(
                generatePath(endpoints.viewprediction, {predictionId: request.predictionId}), // /api/v1/users/1
                authHeader('application/json')
            )

            dispatch(statusActions.setLoading(false))

            const data = (response.data as GetPredictionResponse)
            return data.data
        } catch (err) {
            alert(err)
            // handleError(err, dispatch)
        }
    }
)