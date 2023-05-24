import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "@config/config"
import { statusActions } from "@store/status"
import endpoints from "@constants/endpoints/api"
import { generatePath } from "react-router-dom"
import authHeader from "@utils/header";
import { Operation } from "@models/Operation"

interface Request {
    operationId: string
}

export interface GetOperationResponse {
    data: Operation
}

export const GetOperationService = createAsyncThunk(
    endpoints.viewoperation,
    async (request: Request, { dispatch }) => {
        try {
            dispatch(statusActions.setLoading(true))

            const response = await api.get(
                generatePath(endpoints.viewoperation, {operationId: request.operationId}), // /api/v1/users/1
                authHeader('application/json')
            )

            dispatch(statusActions.setLoading(false))

            const data = (response.data as GetOperationResponse)
            return data.data
        } catch (err) {
            alert(err)
            // handleError(err, dispatch)
        }
    }
)