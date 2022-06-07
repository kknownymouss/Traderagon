
// calculates crypto price using live exchange rate passed as a param
export const calcPrice = (amount, rate) => {
    const price = (parseFloat(amount) * parseFloat(rate)).toFixed(3)
    return isNaN(price) ?  "0.00" : price
}