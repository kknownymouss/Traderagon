import { Breakpoint } from 'react-socks'
import HomeLarge from './HomeLarge';
import HomeSmall from './HomeSmall';
function Home() {
    return ( 
        <>
            <Breakpoint medium down>
                <HomeSmall />
            </Breakpoint>
            <Breakpoint large up>
                <HomeLarge />
            </Breakpoint>
        </>
     );
}

export default Home;