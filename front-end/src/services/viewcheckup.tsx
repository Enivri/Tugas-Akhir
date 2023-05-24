import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "@config/config"
import { statusActions } from "@store/status"
import endpoints from "@constants/endpoints/api"
import { generatePath } from "react-router-dom"
import authHeader from "@utils/header";
import { CheckUp } from "@models/CheckUp"

interface Request {
    checkupId: string
}

export interface GetCheckUpResponse {
    data: CheckUp
}

export const GetCheckUpService = createAsyncThunk(
    endpoints.viewcheckup,
    async (request: Request, { dispatch }) => {
        try {
            dispatch(statusActions.setLoading(true))

            const response = await api.get(
                generatePath(endpoints.viewcheckup, {checkupId: request.checkupId}), // /api/v1/users/1
                authHeader('application/json')
            )

            dispatch(statusActions.setLoading(false))

            const data = (response.data as GetCheckUpResponse)
            return data.data
        } catch (err) {
            alert(err)
            // handleError(err, dispatch)
        }
    }
)