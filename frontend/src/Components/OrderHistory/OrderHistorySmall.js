import { useState, useEffect } from 'react'
import { fetchDashboard } from "../../Fetching/DashboardFetch"
import Navbar from '../Navbar/Navbar'
import Loading from "../Loading"
import OrderSmall from '../Order/OrderSmall'
import "../../static/css/OrderHistory.css"

function OrderHistorySmall() {

    // user info state mostly for navbar
    const [userInfo, setUserInfo] = useState({})

    // fetch the user info and wallets and set active wallet to first wallet on first fetch
    useEffect(() => {
        
        (async () => {
            try {
                const fetchedUserData = await fetchDashboard()
                setUserInfo({
                    ...fetchedUserData,
                    orders: fetchedUserData.orders.slice().reverse()
                })
            
            } catch(err) {
                console.log("failed to fetch user data")
            }
          })();  

    }, [])


    return ( 
        <>
            {Object.keys(userInfo).length > 0 ?
            <div className='order-history-wrap'>
                <Navbar name={userInfo.name} balanceWallet={userInfo.balanceWallet.balance.$numberDecimal} /> 
                <div style={{marginBottom: "20px", marginTop: "50px"}} className="orders-data">
                    <div className="orders-nav">
                        <h1>Order History</h1>
                    </div>
                </div>
                <div style={{paddingBottom: "20px"}} className='orders-data'>
                    <table>
                        <tr style={{ fontSize: "14px" }}>
                            <th style={{color: "darkgrey"}}>Coin</th>
                            <th style={{color: "darkgrey"}}>Amount</th>
                            <th style={{color: "darkgrey"}}>Price</th>
                            <th style={{color: "darkgrey"}}>Order</th>
                        </tr>
                        {userInfo.orders.map(item => 
                            <OrderSmall attr={item} />)}
                    </table>
                </div>
            </div> : 
            <Loading />
        }
        </>
     );
}

export default OrderHistorySmall;