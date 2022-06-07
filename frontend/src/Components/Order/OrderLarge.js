import { prettyDate } from "../../HelperMethods/PrettyPrint";
import "../../static/css/Order.css"

function OrderLarge(props) {
    return ( 
            <tr>
                <td>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <img style={{height: "35px", width: "35px", marginRight: "20px"}} src={require(`../../static/assets/SVG-icons/${(props.attr.chain).toLowerCase()}.svg`)} />
                        <div>
                            <h3>{props.attr.chain}</h3>
                        </div>
                    </div>
                </td>
                <td>
                    <p style={{fontSize: "16px"}}>
                        {parseFloat(props.attr.amount).toFixed(3)} {props.attr.chain}
                    </p>
                </td>
                <td>
                    <p style={{fontSize: "16px"}}>
                        {parseFloat(props.attr.exchangeRate).toFixed(3)} USDT
                    </p>
                </td>
                <td>
                    <p style={{fontSize: "16px"}}>
                        {prettyDate(props.attr.createdAt)}
                    </p>
                </td>
                <td>
                    <p style={{fontSize: "20px"}} className={props.attr.orderType == "Buy" ? "buy-order" : "sell-order"}>{props.attr.orderType}</p>
                </td>
            </tr>
     );
}

export default OrderLarge;