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
    patient_id: string
    limit: number
    offset: number
}

export interface OperationPatientResponse {
    data: Operation[]
    hasPrevPage: boolean
    hasNextPage: boolean
}

export const GetOperationPatientService = createAsyncThunk(
    endpoints.operationpatient,
    async (request: Request, { dispatch }) => {
        try {
            dispatch(statusActions.setLoading(true))

            const response = await api.get(
                endpoints.operationpatient + "?" + objectToQueryString(request), 
                authHeader('application/json')
            )

            dispatch(statusActions.setLoading(false))

            const data = (response.data as OperationPatientResponse)
            return data
        } catch (err) {
            alert(err)
            // handleError(err, dispatch)
        }
    }
)