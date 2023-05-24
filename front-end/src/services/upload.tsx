import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "@config/config"
import authHeader from "@utils/header"

export type Request = {
    file: File
}

export type Response = {
    api_key: string,
    asset_id: string,
    bytes: number,
    created_at: string,
    etag: string,
    folder: string,
    format: string,
    height: number,
    original_filename: string,
    placeholder: boolean,
    public_id: string,
    resource_type: string,
    secure_url: string,
    signature: string,
    tags: string[],
    type: string,
    url: string,
    version: number,
    version_id: string,
    width: number
}

export const upload = createAsyncThunk(
    'upload',
    async (params?: File) => {
        try {
            if (!params) return

            const requestBody: Request = {
                file: params,
            } 
            const response = await api.post(
                `/upload`,
                requestBody,
                authHeader('multipart/form-data'),
            )

            const data: Response = response.data
            return data.secure_url
        } catch (err) {
            alert(err)
        }
    }
)