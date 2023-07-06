import { createAsyncThunk } from "@reduxjs/toolkit"
import { statusActions } from "@store/status"
import api from '@config/config'
import endpoints from '@constants/endpoints/api'
import { Gender, User } from "@models/User"
import authHeader from "@utils/header"
import { AxiosError } from "axios"
import { upload } from "./upload"

export interface CreatePatientRequest {
    name: string
    nik: string
    email : string
    password: string
    town: string
    gender: Gender
    birth_date: string
    phone: string
    picture?: File
}

export const CreatePatientService = createAsyncThunk(
    endpoints.createpatient,
    async (params: CreatePatientRequest, { dispatch }) => {
        try {
            dispatch(statusActions.setLoading(true))

            const picture_url = await dispatch(upload(params.picture)).unwrap()

            const request = {
                ...params,
                picture: picture_url,
            }

            const response = await api.post(
                endpoints.createpatient,
                request, 
                authHeader("application/json"),
            )
            const data = (response.data as User)
            return data
        } catch (err) {
            // handleError(err, dispatch)
            console.log((err as AxiosError).response)
            throw Error("error")
        }
    }
)