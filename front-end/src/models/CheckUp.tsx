import { User } from "./User"
import { Operation } from "./Operation"


export type CheckUp = {
    id: number
    patient_id: number
    doctor_id: number
    operation_id: number
    right_eye_pic?: string
    left_eye_pic?: string
    description: string
    created_at: string
    user: User
    operation : Operation
}
