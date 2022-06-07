import {Switch, Route, BrowserRouter} from 'react-router-dom'
import Register  from "./Register";
import Login from "./Login"
import Home from "./Market/Home"
import PrivateRoute from '../Routes/PrivateRoute';
import PublicRoute from '../Routes/PublicRoute';
import Wallets from './Wallets/Wallets';
import OrderHistory from './OrderHistory/OrderHistory';
import  { BreakpointProvider } from 'react-socks';


function App() {
  return (
    <BreakpointProvider>
      <BrowserRouter>
        <Switch>
            <PublicRoute path="/register" exact component={Register} />
            <PublicRoute path="/login" exact component={Login} />
            <PrivateRoute path="/market" exact component={Home} />
            <PrivateRoute path="/wallets" exact component={Wallets} />
            <PrivateRoute path="/history" exact component={OrderHistory} />
        </Switch>
      </BrowserRouter>
    </BreakpointProvider>
  );
}

export default App;
