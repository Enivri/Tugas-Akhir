import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "@config/config"
import { statusActions } from "@store/status"
import endpoints from "@constants/endpoints/api"
import { objectToQueryString } from "@utils/urlHelper"
import { Role, User } from "@models/User"
import authHeader from "@utils/header"

interface Request {
    role: Role
    search: string
    limit: number
    offset: number
}

export interface Response {
    data: User[]
    hasPrevPage: boolean
    hasNextPage: boolean
}

export const GetUserListService = createAsyncThunk(
    endpoints.userlist,
    async (request: Request, { dispatch }) => {
        try {
            dispatch(statusActions.setLoading(true))

            const response = await api.get(
                endpoints.userlist + "?" + objectToQueryString(request), // /api/v1/users?role=name
                authHeader('application/json')
            )

            dispatch(statusActions.setLoading(false))

            const data = (response.data as Response)
            return data
        } catch (err) {
            alert(err)
            // handleError(err, dispatch)
        }
    }
)