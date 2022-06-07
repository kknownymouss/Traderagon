import { Breakpoint } from 'react-socks'
import NavbarLarge from './NavbarLarge';
import NavbarSmall from './NavbarSmall';

function Navbar(props) {
    return ( 
        <>
            <Breakpoint medium down>
                <NavbarSmall name={props.name} balanceWallet={props.balanceWallet} />
            </Breakpoint>
            <Breakpoint large up>
                <NavbarLarge name={props.name} balanceWallet={props.balanceWallet} />
            </Breakpoint>
        </>
     );
}

export default Navbar;