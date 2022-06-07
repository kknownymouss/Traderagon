import { getJWT } from "../Authentication/Auth"

export const withdrawFetch = async(address, targetAddress, amount) => {
    const API_ENDPOINT = "api/wallet/withdraw"
    let res = await fetch(`${API_ENDPOINT}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getJWT()}`
        },
        body: JSON.stringify({
            address,
            targetAddress,
            amount
        })
    })

    if (res.ok) {
        res = await res.json()
        return res
    } else {
        console.log(res)
        throw new Error("Something went wrong")
    }
}

export const buyFetch = async(address, amount) => {
    const API_ENDPOINT = "api/wallet/buy"
    let res = await fetch(`${API_ENDPOINT}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getJWT()}`
        },
        body: JSON.stringify({
            address,
            amount
        })
    })

    if (res.ok) {
        res = await res.json()
        return res
    } else {
        res = await res.json()
        console.log(res)
        throw new Error("Something went wrong")
    }
}

export const sellFetch = async(address, amount) => {
    const API_ENDPOINT = "api/wallet/sell"
    let res = await fetch(`${API_ENDPOINT}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getJWT()}`
        },
        body: JSON.stringify({
            address,
            amount
        })
    })

    if (res.ok) {
        res = await res.json()
        return res
    } else {
        res = await res.json()
        console.log(res)
        throw new Error("Something went wrong")
    }
}

export const createWalletFetch = async(chain) => {
    const API_ENDPOINT = "api/wallet/create"
    let res = await fetch(`${API_ENDPOINT}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getJWT()}`
        },
        body: JSON.stringify({
            chain
        })
    })

    if (res.ok) {
        res = await res.json()
        return res
    } else {
        res = await res.json()
        console.log(res)
        throw new Error("Something went wrong")
    }
}