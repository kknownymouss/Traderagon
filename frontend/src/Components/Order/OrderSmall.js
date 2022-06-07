import "../../static/css/Order.css"

function OrderSmall(props) {
    return ( 
            <tr>
                <td>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <img style={{height: "30px", width: "30px", marginRight: "10px"}} src={require(`../../static/assets/SVG-icons/${(props.attr.chain).toLowerCase()}.svg`)} />
                        <div>
                            <h4>{props.attr.chain}</h4>
                        </div>
                    </div>
                </td>
                <td>
                    <p style={{fontSize: "14px"}}>
                        {parseFloat(props.attr.amount).toFixed(3)} {props.attr.chain}
                    </p>
                </td>
                <td>
                    <p style={{fontSize: "14px"}}>
                        {parseFloat(props.attr.exchangeRate).toFixed(3)} USDT
                    </p>
                </td>
                <td>
                    <p style={{fontSize: "18px"}} className={props.attr.orderType == "Buy" ? "buy-order" : "sell-order"}>{props.attr.orderType}</p>
                </td>
            </tr>
     );
}

export default OrderSmall;