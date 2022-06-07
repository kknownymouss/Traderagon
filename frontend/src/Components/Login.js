import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useHistory } from "react-router-dom"
import { login } from "../Fetching/AuthFetch"
import Background from "../static/assets/bg.png"
import "../static/css/Register.css"

function Login() {

    const [formData, setFormData] = useState({
        email : "",
        password : ""
    })

    const [error, setError] = useState(false)

    const history = useHistory()


    // handle input change
    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }


    const onSubmit = (e) => {
        e.preventDefault()
        login(formData, history).catch(() => setError(true))
    }



    return ( 
        <div className="login-wrap" style={{backgroundImage: `url(${Background})`}}>
            <div className="login-navbar">
                <div style={{display: "flex", alignItems: "center"}}>
                    <svg height="50" width="50">
                        <circle cx="25" cy="25" r="15" stroke="lightblue" stroke-width="3" fill="lightblue" />
                    </svg>
                    <p className="login-navbar-title">
                        Traderagon.
                    </p>
                </div>
            </div>
            <div className="login-form slide-in-left">
                <div className="login-form-titles">
                    <p style={{color: "darkgray", fontSize: "16px", textTransform: "uppercase"}}>Continue Trading</p>
                    <h1 style={{ marginBottom: "20px", marginTop: "6px" }}>Welcome Back<span style={{color: "lightblue"}}>.</span></h1>
                    <p style={{color: "darkgray", fontSize: "16px", marginBottom: "20px"}}>
                        Are You New Here ?
                        <span>
                            <Link style={{ color: "lightblue", paddingLeft: "8px" }} to="/register">
                                Register
                            </Link>
                        </span>
                    </p>
                </div>
                <form className="login-form-inputs" id="login">
                    <div className="login-form-input-wrap">
                            <label>Email</label>
                            <div className="login-form-input-wrap-1">
                                <input type="text" name="email" onChange={onChange} value={formData.email} className="login-form-input"></input>
                                <span className="material-icons login-form-icons">
                                    email
                                </span>
                            </div>
                        </div>
                        <div className="login-form-input-wrap">
                        <label>Password</label>
                        <div className="login-form-input-wrap-1">
                            <input type="password" name="password" onChange={onChange} value={formData.password} className="login-form-input"></input>
                            <span className="material-icons login-form-icons">
                                key
                            </span>
                        </div>
                        {error && <p>Wrong password</p>}
                    </div>
                </form>
                <button onClick={onSubmit} type="submit" value="submit" form="login" className="login-form-submit-buttom">Login</button>
            </div>

        </div>
     );
}

export default Login;