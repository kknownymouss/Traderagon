import { Breakpoint } from 'react-socks'
import WalletsLarge from './WalletsLarge';
import WalletsSmall from './WalletsSmall';

function Wallets(props) {
    return ( 
        <>
            <Breakpoint medium down>
                <WalletsSmall />
            </Breakpoint>
            <Breakpoint large up>
                <WalletsLarge />
            </Breakpoint>
        </>
     );
}

export default Wallets;