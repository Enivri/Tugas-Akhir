import { Prediction } from "./Prediction"
import { User } from "./User"

export type Diagnosis = {
    id: number
    patient_id: number
    doctor_id: number
    prediction_id: number
    code: string
    right_eye_pic?: string
    left_eye_pic?: string
    right_eye_cond: string
    left_eye_cond: string
    description: string
    created_at: string
    user?: User
    doctor?: User
    prediction?: Prediction
}