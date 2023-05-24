function padZero(input: number): string {
    return String(input).padStart(2, "0")
}


export function parseDate(input: string): string {
    const date = new Date(input)

    return `${padZero(date.getDate())}/${padZero(date.getMonth() + 1)}/${date.getFullYear()}`
}

