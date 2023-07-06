import { RootState, useAppSelector } from "@store"

export const usePermission = (moduleName: string) => {
    const credentials = localStorage.getItem("credentials")
    if (credentials) {
        const parsedCredentials = JSON.parse(credentials)
        const accesses = parsedCredentials.accesses
        
        return accesses?.some((access: string) => access === moduleName)
    }
    return false
}
