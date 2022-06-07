import React from "react"
import { useEffect, useState } from "react";
import { fetchDashboard } from "../../Fetching/DashboardFetch" 
import { fetchCurrencyDetails, fetchLivePrices } from "../../Fetching/CurrencyFetch";
import { supportedCoins } from "../../Coins/coins";
import { prettyChange } from "../../HelperMethods/PrettyPrint";
import TradeModal from "../TradeModal/TradeModal"
import Modal from 'react-modal';
import Navbar from "../Navbar/Navbar"
import "../../static/css/Home.css"
import Loading from "../Loading";

Modal.setAppElement('#root');

function HomeSmall() {

    // navbar related state (balance and name most likely)
    const [userInfo, setUserInfo] = useState({})

    // state action list to update user info after buy/sell
    const [actionList, setActionList] = useState([])

    // fetching the lvive prices and details of the coins
    const [livePrices, setLivePrices] = useState({})
    const [currDetails, setCurrDetails] = useState({})

    // filtering state for the search bar
    const [searchFilter, setSearchFilter] = useState("")

    // modal related states
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [modalCoin, setModalCoin] = useState({
        chain: "",
        livePrice: "",
        liveChange: "",
        wallets: [],
        balance: ""
    })


    // css styling for the modal
    const modalStyle= {
        content: {
            width: "90%",
            height: "80vh",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgb(19, 20, 20)",
            borderRadius: "10px",
            border: "none",
            padding: "10px",
            boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.1)"
        },
    }

    // opening the modal and updating state for props
    function openModal(item) {
        setModalCoin({
            chain: item,
            livePrice: livePrices[item],
            liveChange: currDetails[item].changeRate,
            balance: userInfo.balanceWallet.balance.$numberDecimal,
            wallets: (userInfo.wallets).filter(wallet => wallet.chain == item)
        })
        setIsOpenModal(true);
        
    }


    // closing the modal
    function closeModal() {
        setIsOpenModal(false);
    }

    // appends 1 to the action list to trigger useEffect data refetching
    const refetchUserInfo = () => {
        setActionList(prev => (prev.concat(1)))
    }

    // refetch user data after buy/sell
    useEffect(() => {

        (async () => {
            try {
                const fetchedUserInfo = await fetchDashboard()
                setUserInfo(fetchedUserInfo)
                setModalCoin(prev => ({
                    ...prev,
                    balance: fetchedUserInfo.balanceWallet.balance.$numberDecimal,
                    wallets: (fetchedUserInfo.wallets).filter(wallet => wallet.chain == prev.chain)
                }))
            
            } catch(err) {
                console.log("failed to fetch prices")
            }
          })();  
    }, [actionList])

    
    // initializing the interval for fetching prices/curr details
    useEffect(() => {
        
        // fetches the user info once on mounting
        (async () => {
            try {
                setUserInfo(await fetchDashboard())
            
            } catch(err) {
                console.log("failed to fetch prices")
            }
          })();   


        // setting the interval
        const inter = setInterval(async() => {
            try {
                const allPromise = await Promise.all([fetchLivePrices(supportedCoins), fetchCurrencyDetails()])
                setLivePrices(allPromise[0])
                setCurrDetails(allPromise[1]) 
                
                // updates passed props to modal for live currency prices/details when modal is opened
                setModalCoin(prev => ({
                    ...prev,
                    livePrice: allPromise[0][prev.chain],
                    liveChange: allPromise[1][prev.chain]?.changeRate, // preventing error with ? in case modalCoin is set to none
                }))
                
            } catch (err) {
                console.log("couldnt fetch prices")
            }

        }, 2000);

        return () => clearInterval(inter); // This is important

    }, [])


    return ( 
        <React.Fragment>
            <Modal
                isOpen={isOpenModal}
                onRequestClose={closeModal}
                closeTimeoutMS={300}
                style={modalStyle}
            >
                <TradeModal attr={modalCoin} refetch={refetchUserInfo} />
            </Modal>
            {Object.keys(userInfo).length > 0 && Object.keys(livePrices).length > 0 && Object.keys(currDetails).length > 0 ?
                <div className="home-wrap"> 
                    <Navbar name={userInfo.name} balanceWallet={userInfo.balanceWallet.balance.$numberDecimal} /> 
                    <div style={{marginBottom: "15px", marginTop: "50px"}} className="market-data">
                        <div className="market-nav">
                            <h2>Coin Market</h2>
                            <div className="coin-market-input-wrap-1">
                                <input autocomplete="off" placeholder="Search..." value={searchFilter} onChange={e => setSearchFilter(e.target.value)} type="text" name="email" className="coin-market-search-input"></input>
                                <span className="material-icons coin-market-icons">
                                    search
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="market-data">  
                        <table>
                            <tr>
                                <th style={{color: "darkgrey"}}>Coin</th>
                                <th style={{color: "darkgrey"}}>Price</th>
                                <th style={{color: "darkgrey", textAlign: "center"}}>Change (24H)</th>
                            </tr>
                            {
                                supportedCoins.filter((i) => {
                                    if (searchFilter.length > 0) {
                                        return (i.slice(0, searchFilter.length) == searchFilter.toUpperCase())
                                    } else {
                                        return true
                                    }
                                }).map((item) => 
                                <tr onClick={() => openModal(item)}>
                                    <td>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <img style={{height: "25px", width: "25px", marginRight: "10px"}} src={require(`../../static/assets/SVG-icons/${item.toLowerCase()}.svg`)} />
                                            <p>{item}</p>
                                        </div>
                                    </td>
                                    <td>{parseFloat(livePrices[item]).toFixed(3)}
                                        <span style={{color: "darkgray", fontSize: "14px", paddingLeft: "6px"}}>
                                            USD
                                        </span>
                                    </td>
                                    <td style={{color: prettyChange(currDetails[item].changeRate)[1] > 0 ? "lightgreen" : "lightcoral", textAlign: "center"}}>
                                        {prettyChange(currDetails[item].changeRate)[0]}
                                    </td>
                                </tr>
                                )
                            }
                        </table> 
                    </div> 
                </div> 
                : 
                <Loading /> }
        </React.Fragment>
        
     );
}

export default HomeSmall;