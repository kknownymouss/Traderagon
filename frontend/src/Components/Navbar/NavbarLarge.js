import "../../static/css/Navbar.css"
import { Link } from 'react-router-dom'
import { logoutWrap } from "../../Authentication/Auth";

function NavbarLarge(props) {
    return ( 
        <div className="login-navbar">
            <div style={{display: "flex", alignItems: "center"}}>
                <svg height="50" width="50">
                    <circle cx="25" cy="25" r="15" stroke="lightblue" stroke-width="3" fill="lightblue" />
                </svg>
                <p className="login-navbar-title">
                    Traderagon.
                </p>
            </div>
            <div style={{display: "flex", alignItems: "center"}}>

                <Link to="/market" className="login-navbar-link">Market</Link>
                <Link to="/wallets" className="login-navbar-link">Wallets</Link>
                <Link to="/history" className="login-navbar-link">History</Link>
                <p onClick={logoutWrap} className="login-navbar-link">Logout</p>
                <svg style={{marginLeft: "25px"}}  height="50" width="50">
                    <circle cx="25" cy="25" r="15" stroke="lightgreen" stroke-width="3" fill="lightgreen" />
                </svg>
                <p style={{borderRight: "3px solid darkgrey", marginRight: "10px", paddingRight: "10px"}} className="login-navbar-title">
                    {props.name}
                </p>
                <p style={{fontSize: "18px"}}>{parseFloat(props.balanceWallet).toFixed(2)} $</p>
            </div>
        </div>
     );
}

export default NavbarLarge;