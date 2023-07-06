import { createAsyncThunk } from "@reduxjs/toolkit"
import api from '@config/config'
import endpoints from '@constants/endpoints/api'

interface Request {
    email: string
    password: string
}

interface Response {
    name: string
    token: string
    accesses: string[]
}

export const login = createAsyncThunk(
    'login',
    async (request: Request) => {
        try{
            const response = await api.post(
                endpoints.login,
                request,
            )
            const data = (response.data as Response)
            return data
        } catch(err) {
            alert(err)
        }
    }
)
