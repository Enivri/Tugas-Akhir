import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "@config/config"
import { statusActions } from "@store/status"
import endpoints from "@constants/endpoints/api"
// import authHeader from "@services/authHeader"
// import handleError from "@services/errorHandling"
// import { generatePath } from "react-router-dom"
import { User } from "@models/User"
import { generatePath } from "react-router-dom"
import authHeader from "@utils/header";

interface Request {
    userId: string
}

export interface Response {
    data: User
}

export const GetUserService = createAsyncThunk(
    endpoints.viewpatient,
    async (request: Request, { dispatch }) => {
        try {
            dispatch(statusActions.setLoading(true))

            const response = await api.get(
                generatePath(endpoints.viewpatient, {userId: request.userId}), // /api/v1/users/1
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