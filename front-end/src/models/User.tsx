
export type Gender = "female" | "male" | ""
export type Role = "admin" | "doctor" | "patient"

export type User = {
    id: number
    name: string
    nik: string
    email: string
    password?: string
    town: string
    gender: string
    birth_date: string
    phone: string
    picture?: string
    role: string
    created_at: string
}
