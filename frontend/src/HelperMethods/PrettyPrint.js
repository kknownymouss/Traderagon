import millify from "millify"

// returns a list containing change with + and - signs, and pure float integer for comparisons (red or green for styling)
export const prettyChange = (change) => {
    const prettyChangeFloat = (parseFloat(change) * 100)
    const positiveChange = prettyChangeFloat > 0
    return [
        positiveChange ? `+${prettyChangeFloat.toFixed(2)}%` : `${prettyChangeFloat.toFixed(2)}%`, 
        prettyChangeFloat,
        positiveChange ? "lightgreen" : "lightcoral"
    ]
}


// returns a pretty string of the volume in the last 24 hours
export const prettyVolume = (volume) => {
    return millify(parseFloat(volume), {
        precision: 3,
        space: true
    })
}


// parse pretty dates
export const prettyDate = (date) => {
    const dateObj = new Date(date)
    return dateObj.toLocaleString("en-US")
}





    