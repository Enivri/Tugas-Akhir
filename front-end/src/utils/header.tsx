export default function authHeader(contentType: "application/json" | "multipart/form-data") {
    const credentials = JSON.parse(localStorage.getItem("credentials") || "");

    if (credentials) {
        return {
            headers: {
                "Authorization" : "Bearer " + credentials.token,
                "Content-Type": contentType,
            },
        };
    }
    return {}
}
