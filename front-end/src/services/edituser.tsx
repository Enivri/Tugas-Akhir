import { createAsyncThunk } from "@reduxjs/toolkit"
import { statusActions } from "@store/status"
import api from '@config/config'
import endpoints from '@constants/endpoints/api'
import { Gender, User } from "@models/User"
import authHeader from "@utils/header"
import { generatePath } from "react-router-dom"
import { upload } from "./upload"

export interface EditUserParams {
    userId: string
    name: string
    nik: string
    email : string
    town: string
    gender: string
    birth_date: string
    phone: string
    picture?: File
}

interface EditUserRequest {
    name: string
    nik: string
    email : string
    town: string
    gender: string
    birth_date: string
    phone: string
    picture?: string
}

export const EditUserService = createAsyncThunk(
    endpoints.edituser,
    async (params: EditUserParams, { dispatch }) => {
        try {
            dispatch(statusActions.setLoading(true))

            const picture_url = await dispatch(upload(params.picture)).unwrap()

            const request: EditUserRequest = {
                name: params.name,
                nik: params.nik,
                email: params.email,
                town: params.town,
                gender: params.gender,
                birth_date: params.birth_date,
                phone: params.phone,
                picture: picture_url,
            }

            await api.put(
                generatePath(endpoints.edituser, {userId: params.userId}),
                {
                    ...request,
                    ...authHeader('application/json'),
                }
                // request,
            )
        } catch (err) {
            // handleError(err, dispatch)
        }
    }
)