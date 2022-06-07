import { Breakpoint } from 'react-socks'
import TradeModalLarge from './TradeModalLarge';
import TradeModalSmall from './TradeModalSmall';

function TradeModal(props) {
    return ( 
        <>
            <Breakpoint medium down>
                <TradeModalSmall attr={props.attr} refetch={props.refetch} />
            </Breakpoint>
            <Breakpoint large up>
                <TradeModalLarge attr={props.attr} refetch={props.refetch} />
            </Breakpoint>
        </>
     );
}

export default TradeModal;