import { supportedCoins  } from "../Coins/coins"

// ensures the string is float/integer
export const onlyNumeric = (chars) => {
    if (typeof chars != "string") return false // we only process strings!  
    return  (!isNaN(chars) && !isNaN(parseFloat(chars))) || (chars.length == 0 )
}


// Checks if coin is supported
export const onlySupportedCoins = (chars) => {
    return supportedCoins.includes(chars)
}