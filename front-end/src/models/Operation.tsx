import { Diagnosis } from "./Diagnosis"
import { User } from "./User"

export type Operation = {
    id: number
    patient_id: number
    doctor_id: number
    diagnosis_id: number
    code: string
    right_eye_pic?: string
    left_eye_pic?: string
    result: string
    description: string
    created_at: string
    user?: User
    doctor?: User
    diagnosis?: Diagnosis
}