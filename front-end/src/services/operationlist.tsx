import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "@config/config"
import { statusActions } from "@store/status"
import endpoints from "@constants/endpoints/api"
import authHeader from "@utils/header"
import { Operation } from "@models/Operation"
import { objectToQueryString } from "@utils/urlHelper"

interface Request {
    limit: number
    offset: number
    search: string
}

export interface OperationListResponse {
    data: Operation[]
    hasPrevPage: boolean
    hasNextPage: boolean
}

export const GetOperationListService = createAsyncThunk(
    endpoints.operationlist,
    async (request: Request, { dispatch }) => {
        try {
            dispatch(statusActions.setLoading(true))

            const response = await api.get(
                endpoints.operationlist  + "?" + objectToQueryString(request),
                authHeader('application/json')
            )

            dispatch(statusActions.setLoading(false))

            const data = (response.data as OperationListResponse)
            return data
        } catch (err) {
            alert(err)
            // handleError(err, dispatch)
        }
    }
)