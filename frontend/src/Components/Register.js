import { useState } from "react"
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'
import { register } from "../Fetching/AuthFetch"
import Background from "../static/assets/bg.png"

import "../static/css/Register.css"

function Register() {

    // input state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const history = useHistory()

    // handle input change
    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }

    // handles submitting the form
    const onSubmit = (e) => {
        e.preventDefault()
        register(formData, history)
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
                    <p style={{color: "darkgray", fontSize: "16px", textTransform: "uppercase"}} >Start Trading</p>
                    <h1 style={{ marginBottom: "20px", marginTop: "6px" }}>Create a New Account<span style={{color: "lightblue"}}>.</span></h1>
                    <p style={{color: "darkgray", fontSize: "16px", marginBottom: "20px"}}>
                        Already a Member ?
                        <span>
                            <Link style={{ color: "lightblue", paddingLeft: "8px" }} to="/login">
                                Login
                            </Link>
                        </span>
                    </p>
                </div>
                <form id="register" className="login-form-inputs">
                    <div className="login-form-first-last-name">
                        <div style={{maxWidth: "48%"}} className="login-form-input-wrap">
                            <label>First Name</label>
                            <div className="login-form-input-wrap-1">
                                <input onChange={onChange} name="firstName" className="login-form-input"></input>
                                <span className="material-icons login-form-icons">
                                    badge
                                </span>
                            </div>
                        </div>
                        <div style={{maxWidth: "48%"}} className="login-form-input-wrap">
                            <label>Last Name</label>
                            <div className="login-form-input-wrap-1">
                                <input onChange={onChange} name="lastName" className="login-form-input"></input>
                                <span className="material-icons login-form-icons">
                                    badge
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="login-form-input-wrap">
                            <label>Email</label>
                            <div className="login-form-input-wrap-1">
                                <input onChange={onChange} name="email" className="login-form-input"></input>
                                <span className="material-icons login-form-icons">
                                    email
                                </span>
                            </div>
                        </div>
                        <div className="login-form-input-wrap">
                        <label>Password</label>
                        <div className="login-form-input-wrap-1">
                            <input onChange={onChange} name="password" type="password" className="login-form-input"></input>
                            <span className="material-icons login-form-icons">
                                key
                            </span>
                        </div>
                    </div>
                </form>
                <button type="submit" value="submit" form="register" onClick={onSubmit} className="login-form-submit-buttom">Create Account</button>
            </div>

        </div>
     );
}

export default Register;