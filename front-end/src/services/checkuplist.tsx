import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "@config/config"
import { statusActions } from "@store/status"
import endpoints from "@constants/endpoints/api"
import authHeader from "@utils/header"
import { CheckUp } from "@models/CheckUp"
import { objectToQueryString } from "@utils/urlHelper"

interface Request {
    limit: number
    offset: number
    search: string
}

export interface CheckUpListResponse {
    data: CheckUp[]
    hasPrevPage: boolean
    hasNextPage: boolean
}

export const GetCheckUpListService = createAsyncThunk(
    endpoints.checkuplist,
    async (request: Request, { dispatch }) => {
        try {
            dispatch(statusActions.setLoading(true))

            const response = await api.get(
                endpoints.checkuplist + "?" + objectToQueryString(request),
                authHeader('application/json')
            )

            dispatch(statusActions.setLoading(false))

            const data = (response.data as CheckUpListResponse)
            return data
        } catch (err) {
            alert(err)
            // handleError(err, dispatch)
        }
    }
)