import {Link} from 'react-router-dom'
import { useState } from "react"
import { supportedCoinsNames } from "../Coins/coins"
import { onlySupportedCoins } from "../HelperMethods/inputFilter"
import {createWalletFetch} from "../Fetching/WalletFetch"
import "../static/css/WalletCreate.css"

function WalletCreate(props) {

    // input forms
    const [coinName, setCoinName] = useState("")

    // loading state
    const [createWalletLoading, setCreateWalletLoading] = useState(false)

    // error state
    const [createWalletError, setCreateWalletError] = useState(false)

    // success state
    const [success, setSuccess] = useState(false)

    const onChange = e => {
        setCoinName(e.target.value)
    }

    const createWalletWrap = async() => {
        setCreateWalletLoading(true)
        try {
            await createWalletFetch(coinName)
            setCreateWalletError(false)
            setSuccess(true)
            setCoinName("")
            props.refetch()
        } catch(err){
            setSuccess(false)
            setCreateWalletError(true)
        }
        setCreateWalletLoading(false)
    }

    return ( 
        <div className="wallet-create-div">
            <h2 style={{marginBottom: "15px"}}>Create a New Wallet</h2>
            <p style={{marginBottom: "15px"}}>Check the list of supported coins/chains <Link style={{color: "rgb(31, 151, 216)"}} to="/coinList">here</Link>. Make sure you type the exact symbol of the coin. E.g, BTC, ETH, XRP</p>
            <div className="wallet-create-coin-div">
                <p style={{marginRight: "10px", fontSize: "18px", color: "darkgray"}}>Coin:</p>
                <input value={coinName} onChange={onChange} className="coin-name-input" />
            </div>
            {onlySupportedCoins(coinName) ?
                <p style={{display:"flex", alignItems: "center", color: "lightgreen"}}>This coin is supported<span className="material-icons" style={{marginLeft: "5px"}}>task_alt</span></p> :
                coinName.length > 0 && <p style={{display:"flex", alignItems: "center", color: "lightcoral"}}>This coin is not supported<span style={{marginLeft: "5px"}} className="material-icons">error_outline</span></p>
            }
            <div className="wallet-create-logo">
                {onlySupportedCoins(coinName) ? 
                    <div style={{display: "flex", alignItems: "center", flexDirection: "column", marginBottom:"15px"}}>
                        <img style={{width: "55px", height: "55px", marginBottom: "10px"}} src={require(`../static/assets/SVG-icons/${(coinName).toLowerCase()}.svg`)} />
                        <p style={{fontSize: "18px"}}>{supportedCoinsNames[coinName]}</p>
                    </div>
                    :
                    <div style={{display: "flex", alignItems: "center", flexDirection: "column", marginBottom: "15px"}}>
                        <span style={{fontSize: "55px", color: "darkgray"}} className="material-icons">
                            help_center
                        </span>
                        <p style={{fontSize: "18px"}}>Not Found</p>
                    </div>
                }
            </div> 
            <div style={{display: "flex", flexDirection: "column", flexGrow: 2, justifyContent: "flex-end"}}>
                <button onClick={createWalletWrap} className="wallet-create-button">
                {createWalletLoading ? <span className='material-icons rotating'>
                    refresh
                </span> : "Create Wallet"}
                </button>
            </div>
        </div>
     );
}

export default WalletCreate