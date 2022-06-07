import { setJWT } from "../Authentication/Auth"

// handle login, setting jwt, and redirecting to home page
export const login = async(formData, history) => {
    const API_ENDPOINT = "/api/user/login"
    let res = await fetch(`${API_ENDPOINT}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    if (res.ok) {
        res = await res.json()
        setJWT(res.token)
        history.push("/market")
    } else {
        throw new Error("Wrong credentials")
    }
}

// handle register, setting jwt, and redirecting to home page
export const register = async(formData, history) => {
    const API_ENDPOINT = "/api/user/register"
    let res = await fetch(`${API_ENDPOINT}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...formData,
            name: `${formData.firstName} ${formData.lastName}`
        })
    })

    if (res.ok) {
        res = await res.json()
        setJWT(res.token)
        history.push("/market")
    } else {
        throw new Error("Wrong credentials")
    }
}

