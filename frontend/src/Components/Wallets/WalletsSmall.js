import Navbar from "../Navbar/Navbar"
import { useEffect, useState } from 'react'
import React from "react"
import { fetchDashboard } from "../../Fetching/DashboardFetch"
import { withdrawFetch } from "../../Fetching/WalletFetch"
import { supportedCoinsNames } from "../../Coins/coins"
import { onlyNumeric } from "../../HelperMethods/inputFilter"
import "../../static/css/Wallets.css"
import WalletCreate from "../WalletCreate"
import QRCode from "react-qr-code";
import Modal from 'react-modal';
import Scanner from "../Scanner"
import Loading from "../Loading"



Modal.setAppElement('#root');

function Wallets() {

    // user info state mostly for navbar
    const [userInfo, setUserInfo] = useState({})

    // qrcode state
    const [reader, setReader] = useState(false)
    const [result, setResult] = useState("")

    // mobile wallets preview modal state
    const [walletPreview, setWalletPreview] = useState(false)

    // action list STATE to update user info after create wallet
    const [actionList, setActionList] = useState([])

    // loading state
    const [withdrawLoading, setWithdrawLoading] = useState(false)

    // success state
    const [withdrawSuccess, setWithdrawSuccess] = useState(false)

    // modal state
    const [isOpenModal, setIsOpenModal] = useState(false)

    // UI states
    const [activeWallet, setActiveWallet] = useState({})
    const [createWallet, setCreateWallet] = useState(false)

    // input form for withdrawing amount and address
    const [withdrawForm, setWithdrawForm] = useState({
        targetAddress: "",
        amount: ""
    })

    // opens modal for qr code scanning
    const openReader = () => {
        openModal()
        setReader(true)
    }

    // opens modal for wallet preview
    const openWalletPreview = () => {
        openModal()
        setWalletPreview(true)
    }

    // modal style
    const modalStyle1= {
        content: {
            width: "90%",
            height: "70vh",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "none",
            boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            color: "white"
        },
    }
    const modalStyle2= {
        content: {
            width: "90%",
            height: "70vh",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgb(19, 20, 20)",
            borderRadius: "10px",
            border: "none",
            boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            color: "white",
            paddingRight: "0px",
        },
    }

    // Error states
    const [withdrawError, setWithdrawError] = useState(false)

    // appends 1 to the action list to trigger useEffect data refetching
    // and close modal on small screens
    const refetchUserInfo = () => {
        setActionList(prev => (prev.concat(1)))
        if (isOpenModal) {
            setCreateWallet(false)
            closeModal()
        }

    }

    // withdrawing fetch request
    const withdrawWrap = async() => {
        setWithdrawLoading(true)
        try {
            await withdrawFetch(activeWallet.address, withdrawForm.targetAddress, withdrawForm.amount)
            setWithdrawError(false)
            setWithdrawSuccess(true)
            refetchUserInfo()
        } catch(err){
            setWithdrawError(true)
            setWithdrawSuccess(false)
        }
        setWithdrawForm({})
        setWithdrawLoading(false)
    }

    // updates input
    const onChangeFiltered = e => {
        if (onlyNumeric(e.target.value)) {
            setWithdrawForm(prev => ({
                ...prev,
                [e.target.name]: e.target.value
            }))
        }
    }

    const onChange = e => {
        setWithdrawForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    // reset the withdraw form and errors upon changing active wallets
    useEffect(() => {
        setWithdrawForm({
            targetAddress: "",
            amount: ""
        })
        setWithdrawError(false)
    }, [activeWallet])

    // exit scanning modal and insert address into input
    useEffect(() => {
        if (!!result) {
            setWithdrawForm(prev => ({
                ...prev,
                targetAddress: result
            }))  
            closeModal()
        }
    }, [result])

    // opening the modal and updating state for props
    function openModal() {
        setIsOpenModal(true);
    }


    // closing the modal
    function closeModal() {
        setIsOpenModal(false);

        // if modal is scanning modal and is forced closed, wait till modal is closed and then
        // change reset reader and result
        if (reader) {
            setTimeout(() => {
                setReader(false)
                setResult("")
            }, 1000)
        }

        // if wallet preview, set it to false
        if (walletPreview) {
            setTimeout(() => {
                setWalletPreview(false)
                setCreateWallet(false)
                setResult("")
            }, 1000)
        }
    }


    // fetch the user info and wallets and set active wallet to first wallet on first fetch
    useEffect(() => {
        
        (async () => {
            try {
                const fetchedUserData = await fetchDashboard()
                setUserInfo({
                    ...fetchedUserData,
                    wallets: fetchedUserData.wallets.length > 0 ? fetchedUserData.wallets.slice().reverse() : []
                })
                if (fetchedUserData.wallets.length > 0) {
                    setActiveWallet(fetchedUserData.wallets[fetchedUserData.wallets.length - 1])
                }
            
            } catch(err) {
                console.log("failed to fetch user data")
            }
          })();  

    }, [actionList])


    return ( 
        <>
        {Object.keys(userInfo).length > 0 ?
            <div className="wallets-wrap">
            <Modal
                isOpen={isOpenModal}
                onRequestClose={closeModal}
                closeTimeoutMS={300}
                style={walletPreview ? modalStyle2 : modalStyle1}
            >
            {reader ? <><Scanner setResult={setResult} /><p style={{color: "black"}}>{result}</p> </>: 
            walletPreview ? 
            <div className="wallet-preview">
                        <button onClick={() => setCreateWallet(prev => !prev)} className={`create-wallet-button${createWallet ? "-active" : ""}`}>
                            {createWallet ? 
                                <span style={{fontSize: "27px"}} className="material-icons">
                                    close
                                </span>
                                :
                                "Create Wallet"
                            }
                        </button>
                        {!createWallet ? 
                        userInfo.wallets.map(item => 
                            <div onClick={() => {setActiveWallet(item);setWithdrawError(false);setWithdrawSuccess(false);closeModal()}} className="wallet-preview-chain">
                                <div style={{display: "flex", alignItems: "center", width: "50%", marginRight: "35px"}}>
                                    <img style={{height: "40px", width: "40px", marginRight: "10px"}} src={require(`../../static/assets/SVG-icons/${(item.chain).toLowerCase()}.svg`)} />
                                    <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                                        <h4>{item.chain} Wallet</h4>
                                        <p style={{color: "darkgrey", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", width: "80%", fontSize: "14px"}}>{item.address}...</p>
                                    </div>
                                </div>
                                <p style={{textAlign: "right", fontSize: "14px"}}>{parseFloat(item.balance.$numberDecimal).toFixed(2)} {item.chain}</p>
                            </div>

                        ) : <WalletCreate refetch={refetchUserInfo} />}
                    </div>
            :
            <>
                <QRCode
                    size={256}
                    style={{ height: "70%", maxWidth: "100%", width: "70%"}}
                    value={activeWallet.address}
                    viewBox={`0 0 256 256`}
                />
                <p style={{color: "black", fontSize: "20px", marginBottom: "20px", marginTop: "20px", wordBreak: "break-all", textAlign: "center"}}>{activeWallet.address}</p>
                <div style={{display: "flex", alignItems: "center", wordWrap: "break-word", whiteSpace: "pre-wrap", color: "black"}}>
                    <img style={{height: "60px", width: "60px", marginRight: "20px"}} src={require(`../../static/assets/SVG-icons/${(activeWallet.chain).toLowerCase()}.svg`)} />
                    <div>
                        <h3>{activeWallet.chain} Wallet</h3>
                        <p style={{color: "rgb(32, 31, 31)", fontSize: "18px"}}>{supportedCoinsNames[activeWallet.chain]}</p>
                    </div>
                </div>
            </>
            }
            </Modal>
                <Navbar name={userInfo.name} balanceWallet={userInfo.balanceWallet.balance.$numberDecimal} /> 
                <div className="available-wallets">
                    
                    {Object.keys(activeWallet).length > 0 &&
                    <div className="wallet-card">
                        <div className="wallet-card-header">
                            <div style={{display: "flex", alignItems: "center"}}>
                                <span onClick={openWalletPreview} style={{marginRight: "10px"}} class="material-icons">
                                    menu
                                </span>
                                <img style={{height: "45px", width: "45px", marginRight: "10px"}} src={require(`../../static/assets/SVG-icons/${(activeWallet.chain).toLowerCase()}.svg`)} />
                                <div style={{marginRight: "15px"}}>
                                    <h4>{activeWallet.chain}</h4>
                                    <p style={{color: "darkgrey", fontSize: "14px"}}>{supportedCoinsNames[activeWallet.chain]}</p>
                                </div>
                            </div>
                            <h4 style={{wordBreak: "break-all", textAlign: "right"}}>{parseFloat(activeWallet.balance.$numberDecimal).toFixed(4)} {activeWallet.chain}</h4>
                        </div>
                        <div className="wallet-card-info">
                            <h2 style={{fontWeight: "300", marginBottom: "20px", color: "lightblue"}}>Deposit</h2>
                            <div style={{marginBottom: "30px"}}>
                                <p style={{color: "darkgray", wordBreak: "break-all" ,margin: "10px 0px"}}>Address : <span style={{color: "white", fontWeight: "200"}}>{activeWallet.address}</span></p>
                                <button style={{fontSize: "14px"}} onClick={openModal} className="coin-market-trade-but">View QRcode</button>
                            </div>
                            <h2 style={{fontWeight: "300", marginBottom: "20px", color: "lightblue"}}>Withdraw</h2>
                            <div style={{marginBottom: "20px"}}>
                                <p style={{color: "darkgray", marginBottom: "5px"}}>From:</p>
                                <input value={activeWallet.address} readOnly className="wallets-form-input" />
                                <span style={{fontSize: "36px", margin: "10px 0px"}} class="material-icons">
                                    swap_horiz
                                </span>
                                <p style={{color: "darkgray", marginBottom: "5px"}}>To:</p>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <input style={{flexgrow: "2"}} value={withdrawForm.targetAddress} onChange={onChange} name="targetAddress" className="wallets-form-input" />
                                    <button className="qr-code-but"  onClick={openReader}>
                                        <span class="material-icons" style={{margin: "auto"}}>
                                            qr_code_2
                                        </span>
                                    </button>
                                </div>
                                
                            </div>
                            <div style={{display: "flex", alignItems: "center", marginBottom: "30px"}}>
                                <p style={{color: "darkgray"}}>Amount:</p>
                                <input value={withdrawForm.amount} onChange={onChangeFiltered} name="amount" style={{flexGrow: "2", textAlign: "center", margin: "0px 10px"}} className="wallets-form-input" />
                                <p style={{color: "darkgrey", marginRight: "30px"}}> {activeWallet.chain}</p>
                                <button onClick={withdrawWrap} className="coin-market-trade-but">{withdrawLoading ? 
                                    <span className='material-icons rotating'>
                                        refresh
                                    </span> :
                                    "Withdraw"
                                }</button>
                                {withdrawError && <p style={{color: "lightcoral", marginLeft: "10px"}}>Transaction didn't go through.</p>}
                                {withdrawSuccess && <p style={{color: "lightgreen", marginLeft: "10px"}}>Transaction executed successfully.</p>}
                            </div>
                            <h2 style={{fontWeight: "300", marginBottom: "10px", color: "lightblue"}}>Transaction History</h2>
                            {activeWallet.transactions.length > 0 ? activeWallet.transactions.map(item =>
                                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", boxSizing: "border-box", width: "100%", marginBottom: "30px"}}>
                                    <div style={{width: "35%"}}>
                                        <p style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{item.address}</p>
                                    </div>
                                    <span className="material-icons">
                                        arrow_forward
                                    </span>
                                    <div style={{width: "35%"}}>
                                        <p style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{item.targetAddress}</p>
                                    </div>
                                    <p>{item.amount} {item.chain}</p>
                                </div>
                            ) : <p style={{fontSize: '16px'}}>Empty Transaction Record.</p>
                            }
                        </div>
                    </div>
                    }

                </div>

            </div>
            :
            <Loading />
        }
        </>
     );
}

export default Wallets;