type RequestUrl = {
    [x: string]: any
}

export function objectToQueryString(object: RequestUrl): string {
    return Object.keys(object).map(key => key + "=" + String(object[key])).join("&")
}