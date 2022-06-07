const fetch = require('node-fetch')

const fetchLivePrices = async(coins, base="USD") => {

    // base api url
    const API_URL = "https://api.kucoin.com/api/v1/prices"

    // get request params
    const base_query = `base=${base}`
    const currencies_query = `currencies=${coins.toString()}`

    // fetch the data
    const livePrices = await fetch(`${API_URL}?${base_query}&${currencies_query}`).then(res => res.json())

    
    // if argument is not an array, return an object with one coin key
    if (!Array.isArray(coins)) {
        return {
            [coins] : livePrices.data[coins]
        }
    }

    // return fetched data object
    return livePrices.data

}

module.exports = {
    fetchLivePrices
}
