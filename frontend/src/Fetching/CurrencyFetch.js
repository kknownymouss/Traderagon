import { supportedCoins  } from "../Coins/coins"


// fetching live currency data of all supported coins
export const fetchCurrencyDetails = async() => {
    const API_URL = "https://lit-coast-19479.herokuapp.com/https://api.kucoin.com/api/v1/market/allTickers"

    // Fetching data
    const currDetails = (await fetch(`${API_URL}`).then(res => res.json())).data.ticker

    const filteredCurrDetails = currDetails
    .filter(item => {
        if (item.symbol.split("-")[1] == "USDT") {
            return supportedCoins.includes(item.symbol.split("-")[0])
        }
    })
    .reduce((filtered, item) => ({...filtered, [item.symbol.split("-")[0]]: item}) , {})

    return filteredCurrDetails


}

// fetching live exchanged rates of passed coins
export const fetchLivePrices = async(coins, base="USD") => {
    const API_URL = "https://lit-coast-19479.herokuapp.com/https://api.kucoin.com/api/v1/prices"

    // get request params
    const base_query = `base=${base}`
    const currencies_query = `currencies=${coins.toString()}`

    const livePrices = await fetch(`${API_URL}?${base_query}&${currencies_query}`).then(res => res.json())

    if (!Array.isArray(coins)) {
        return {
            [coins] : livePrices.data[coins]
        }
    }

    return livePrices.data

}




    
