import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "@config/config"
import { statusActions } from "@store/status"
import endpoints from "@constants/endpoints/api"
import { objectToQueryString } from "@utils/urlHelper"
// import authHeader from "@services/authHeader"
// import handleError from "@services/errorHandling"
// import { generatePath } from "react-router-dom"
import { Operation } from "@models/Operation"
import authHeader from "@utils/header"

interface Request {
    doctor_id: string
    limit: number
    offset: number
}

export interface OperationDoctorResponse {
    data: Operation[]
    hasPrevPage: boolean
    hasNextPage: boolean
}

export const GetOperationDoctorService = createAsyncThunk(
    endpoints.operationdoctor,
    async (request: Request, { dispatch }) => {
        try {
            dispatch(statusActions.setLoading(true))

            const response = await api.get(
                endpoints.operationdoctor+ "?" + objectToQueryString(request), 
                authHeader('application/json')
            )

            dispatch(statusActions.setLoading(false))

            const data = (response.data as OperationDoctorResponse)
            return data
        } catch (err) {
            alert(err)
            // handleError(err, dispatch)
        }
    }
)