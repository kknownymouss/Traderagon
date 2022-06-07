// get the jwt
export const getJWT = () => localStorage.getItem('jwt') || null

// set the jwt
export const setJWT = (jwt) => localStorage.setItem('jwt', jwt)

// logs the user out by removing the jwt from local storage
export const removeJWT = () => localStorage.removeItem("jwt")

// checks if the user is logged in and returns a boolean
export const isLogin = () => Boolean(getJWT())

// logout function wrap
export const logoutWrap = () => {
    removeJWT()
    window.location.reload()
}