import { User } from "./User"

export type Prediction = {
    id: number
    patient_id: number
    right_eye_pic?: string
    left_eye_pic?: string
    right_eye_cond: string
    left_eye_cond: string
    created_at: string
    user: User
}