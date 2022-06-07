import { getJWT } from "../Authentication/Auth"

export const fetchDashboard = async() => {
    const API_ENDPOINT = "api/user/dashboard"
    let res = await fetch(`${API_ENDPOINT}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getJWT()}`
        }
    })

    if (res.ok) {
        res = await res.json()
        return res
    } else {
        throw new Error("Wrong token")
    }
}