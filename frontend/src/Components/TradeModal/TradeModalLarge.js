import React from 'react'
import { useEffect, useState } from 'react'
import { prettyChange } from "../../HelperMethods/PrettyPrint"
import { buyFetch, sellFetch } from '../../Fetching/WalletFetch'
import { onlyNumeric } from "../../HelperMethods/inputFilter"
import { calcPrice } from "../../HelperMethods/CalculatePrice"
import { supportedCoinsNames } from "../../Coins/coins"
import "../../static/css/TradeModal.css"

function TradeModalLarge(props) {

    // wallet state
    const [activeWallet, setActiveWallet] = useState(props.attr.wallets[0])

    // Input state
    const [tradeAmount, setTradeAmount] = useState("") // Buy/sell input

    // error states
    const [actionError, setActionError] = useState(false)

    // loading state
    const [loadingFetch, setLoadingFetch] = useState({
        buy: false,
        sell: false
    })

    // success state
    const [success, setSuccess] = useState(false)

    // UI consts
    const walletsExist = (props.attr.wallets).length > 0

    // fetching functions
    const buyFetchWrap = async() => {
        if (activeWallet) {
            setLoadingFetch(prev => ({
                ...prev,
                buy: true
            }))
            try {
                const res = await buyFetch(activeWallet.address, tradeAmount)
                setActionError(false)
                setSuccess(true)
            } catch(err) {
                setActionError(true)
                setSuccess(false)
                console.log("err in buy fetch")
            }
            setLoadingFetch(prev => ({
                ...prev,
                buy: false
            }))
            setTradeAmount("")
            props.refetch()
        }
    }

    const sellFetchWrap = async() => {
        setLoadingFetch(prev => ({
            ...prev,
            sell: true
        }))
        if (activeWallet) {
            try {
                const res = await sellFetch(activeWallet.address, tradeAmount)
                setActionError(false)
                setSuccess(true)
            } catch(err) {
                setActionError(true)
                setSuccess(false)
                console.log("err in sell fetch")
            }
            setLoadingFetch(prev => ({
                ...prev,
                sell: false
            }))
            setTradeAmount("")
            props.refetch()
        }
    }


    // handles buy/sell input
    const onChange = (e) => {
        if (onlyNumeric(e.target.value)) {
            setTradeAmount(e.target.value)
        }
    }


    // updates the active wallet info upon refetching and receiving new props after buy/sell
    useEffect(() => {
        setActiveWallet(prev => {
            return (props.attr.wallets).filter(item => item.address == prev.address)[0]
        })
    }, [props.attr])

        
    return ( 
        <React.Fragment>
            {Object.keys(props.attr).length > 0 &&
                <div className="trade-modal-div">
                    <div className="trade-modal-header">
                        <div style={{display: "flex", alignItems: "center"}}>
                            <img style={{height: "50px", width: "50px", marginRight: "10px"}} src={require(`../../static/assets/SVG-icons/${(props.attr.chain).toLowerCase()}.svg`)} />
                            <div>
                                <h3>{props.attr.chain}-USDT</h3>
                                <h3 style={{color: "darkgrey"}}>{supportedCoinsNames[props.attr.chain]}</h3>
                            </div>
                        </div>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <h3 style={{marginRight: "10px"}}>{parseFloat(props.attr.livePrice).toFixed(3)} USDT</h3>
                            <p style={{color: prettyChange(props.attr.liveChange)[2]}}>{prettyChange(props.attr.liveChange)[0]}</p>
                        </div>
                    </div>
                    <div className="wallet-options">
                        <p style={{color: "darkgray", fontSize: "17px", marginRight: "15px"}}>Choose Wallet : </p>
                        {walletsExist ? <select onChange={(e) => {setActiveWallet(JSON.parse(e.target.value))}} name="wallets" id="wallets">
                            {props.attr.wallets.map(item => 
                                <option value={JSON.stringify(item)}>{item.address}</option>
                            )}
                        </select> : <p>No Wallets</p>}
                    </div>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "3em", borderBottom: "3px solid darkgrey", paddingBottom: "3em"}}>
                        <p style={{color: "darkgray"}}>Wallet Balance : <span style={{color: 'white', fontSize: "17px"}}>{activeWallet ? parseFloat(activeWallet.balance.$numberDecimal).toFixed(3) : "0.00"} {props.attr.chain}<span style={{color: "darkgrey", fontSize: "15px"}}> ≈ {activeWallet ? calcPrice(activeWallet.balance.$numberDecimal, props.attr.livePrice) : "0.00"} $</span></span></p>
                        <p style={{color: "darkgray"}}>USDT Balance : <span style={{color: "white", fontSize: "17px"}}>{parseFloat(props.attr.balance).toFixed(3)} $</span></p>
                    </div>
                    <div style={{display: "flex", alignItems:"center", paddingBottom: "1.5em", justifyContent: "center"}}>
                        <p style={{fontSize: "17px", color: "darkgray", marginRight: "10px"}}>Amount: </p>
                        <input placeholder="0.00" value={tradeAmount} onChange={onChange} name="tradeAmount" className="trade-modal-form-input" />
                        <p>{props.attr.chain}<span style={{color: "darkgray"}}> ≈ {calcPrice(tradeAmount, props.attr.livePrice)} $</span></p>
                    </div>
                    {actionError && <p style={{fontSize: "17px", color: "lightcoral", textAlign: "center"}}>Something
                    went wrong or amount exceeds balance.</p>}
                    {success && <p style={{fontSize: "17px", color: "rgb(38, 181, 38)", textAlign: "center"}}>Order executed successfully.</p>}
                    <div style={{display: "flex", alignItems: 'center', justifyContent: 'space-between', marginBottom: "2.5em", paddingTop: "1.5em"}}>
                        <button onClick={buyFetchWrap} className={activeWallet ? "modal-buy-button" : "modal-disabled-button"}>
                            {loadingFetch.buy ? <span className='material-icons rotating'>
                                refresh
                            </span> : "Buy"}
                        </button>
                        <button onClick={sellFetchWrap}  className={activeWallet ? "modal-sell-button" : "modal-disabled-button"}>
                            {loadingFetch.sell ? <span className='material-icons rotating'>
                            refresh
                            </span> : "Sell"}
                        </button>
                    </div>
                    <p style={{color: "darkgray", fontSize: "14px", textAlign: "center"}}>Please make sure before buying/selling as no confirmation is required.</p>
                </div>
            }
        </React.Fragment>
     );
}

export default TradeModalLarge;