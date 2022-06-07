import "../../static/css/Navbar.css"
import { Link } from 'react-router-dom'
import { logoutWrap } from "../../Authentication/Auth";

function NavbarSmall(props) {
    return ( 
        <div>
            <div className="login-navbar">
                <div style={{display: "flex", alignItems: "center"}}>
                    <svg style={{marginRight: "5px"}} height="30" width="30">
                        <circle cx="15" cy="15" r="10" stroke="lightblue" stroke-width="3" fill="lightblue" />
                    </svg>
                    <p className="login-navbar-title">
                        Traderagon.
                    </p>
                </div>
                <div style={{display: "flex", alignItems: "center"}}>
                    <svg style={{marginRight: "5px"}}  height="30" width="30">
                        <circle cx="15" cy="15" r="10" stroke="lightgreen" stroke-width="3" fill="lightgreen" />
                    </svg>
                    <p style={{borderRight: "3px solid darkgrey", paddingRight: "5px", marginRight: "5px", fontSize: "14px"}} className="login-navbar-title">
                        {props.name}
                    </p>
                    <p style={{fontSize: "14px"}}>{parseFloat(props.balanceWallet).toFixed(2)} $</p>
                </div>
            </div>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-evenly"}}>
                <Link to="/market" className="login-navbar-link"><span class="material-icons">
                local_grocery_store
                </span></Link>
                <Link to="/wallets" className="login-navbar-link"><span class="material-icons">
                wallet
                </span></Link>
                <Link to="/history" className="login-navbar-link"><span class="material-icons">
                history
                </span></Link>  
                <p onClick={logoutWrap} className="login-navbar-link"><span class="material-icons">
                logout
                </span></p>  
            </div>
        </div>
     );
}

export default NavbarSmall;