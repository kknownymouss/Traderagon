import { Breakpoint } from 'react-socks'
import OrderHistoryLarge from './OrderHistoryLarge';
import OrderHistorySmall from './OrderHistorySmall';

function OrderHistory() {
    return ( 
        <>
            <Breakpoint medium down>
                <OrderHistorySmall />
            </Breakpoint>
            <Breakpoint large up>
                <OrderHistoryLarge />
            </Breakpoint>
        </>
     );
}

export default OrderHistory;