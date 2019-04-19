import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './containers/Home/Home';
import UserLogin from './components/Forms/UserLogin/UserLogin';
import UserRegister from './components/Forms/UserRegister/UserRegister';
import CatererLogin from './components/Forms/CatererLogin/CatererLogin';
import CatererRegister from './components/Forms/CatererRegister/CatererRegister';
import Menu from './containers/Menu/Menu';
import OrderHistory from './containers/OrderHistory/OrderHistory';
import Orders from './containers/Orders/Orders';
import CatererHome from './containers/Caterer/CatererHome/CatererHome';
import CatererMealOptions from './containers/Caterer/CatererMealOptions/CatererMealOptions';
import CatererOrderHistory from './containers/Caterer/CatererOrderHistory/CatererOrderHistory';
import CatererTodaysOrders from './containers/Caterer/CatererTodaysOrders/CatererTodaysOrders';
import CatererManageMenu from './containers/Caterer/CatererManageMenu/CatererMangeMenu';
import './iziToast.min.css';
import useGlobal from './store';


const App = () => {
  const [globalState] = useGlobal();

  const ProtectedUserRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        globalState.userAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );

  const ProtectedCatererRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        globalState.catererAuthenticated ? <Component {...props} /> : <Redirect to="/admin/login" />
      }
    />
  );
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={UserLogin} />
      <Route path="/register" component={UserRegister} />
      <ProtectedUserRoute path="/menu" component={Menu} />
      <ProtectedUserRoute path="/order-history" component={OrderHistory} />
      <ProtectedUserRoute path="/orders" component={Orders} />
      <ProtectedCatererRoute exact path="/admin/" component={CatererHome} />
      <Route path="/admin/login" component={CatererLogin} />
      <Route path="/admin/register" component={CatererRegister} />
      <ProtectedCatererRoute path="/admin/meals" component={CatererMealOptions} />
      <ProtectedCatererRoute path="/admin/order-history" component={CatererOrderHistory} />
      <ProtectedCatererRoute path="/admin/todays-orders" component={CatererTodaysOrders} />
      <ProtectedCatererRoute path="/admin/menu" component={CatererManageMenu} />
    </Switch>
  );
};

export default App;
