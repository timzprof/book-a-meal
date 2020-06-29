import React, { Suspense, lazy, PureComponent } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './containers/Home/Home';
import Loading from './components/UI/Loading/Loading';
import './iziToast.min.css';

const UserLogin = lazy(() => import('./containers/UserLogin/UserLogin'));
const UserRegister = lazy(() => import('./containers/UserRegister/UserRegister'));
const Menu = lazy(() => import('./containers/Menu/Menu'));
const OrderHistory = lazy(() => import('./containers/OrderHistory/OrderHistory'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const UserLogout = lazy(() => import('./containers/UserLogout/UserLogout'));
const CatererHome = lazy(() => import('./containers/Caterer/CatererHome/CatererHome'));
const CatererRegister = lazy(() => import('./containers/Caterer/CatererRegister/CatererRegister'));
const CatererMealOptions = lazy(() =>
  import('./containers/Caterer/CatererMealOptions/CatererMealOptions')
);
const CatererOrderHistory = lazy(() =>
  import('./containers/Caterer/CatererOrderHistory/CatererOrderHistory')
);
const CatererTodaysOrders = lazy(() =>
  import('./containers/Caterer/CatererTodaysOrders/CatererTodaysOrders')
);
const CatererManageMenu = lazy(() =>
  import('./containers/Caterer/CatererManageMenu/CatererMangeMenu')
);
const NotFound = lazy(() => import('./components/UI/NotFound/Notfound'));

const ProtectedRoute = ({ condition, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (condition ? <Component {...props} /> : <Redirect to="/login" />)}
  />
);

class App extends PureComponent {
  render() {
    const { isAuthenticated, user } = this.props;
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Suspense fallback={<Loading />}>
          <Route exact path="/login" component={UserLogin} />
          <Route exact path="/register" component={UserRegister} />
          <Route exact path="/caterer/register" component={CatererRegister} />
          <Route exact path="/logout" component={UserLogout} />
          <ProtectedRoute
            exact
            condition={isAuthenticated && user.type === 'user'}
            path="/menu"
            component={Menu}
          />
          <ProtectedRoute
            condition={isAuthenticated && user.type === 'user'}
            path="/order-history"
            component={OrderHistory}
          />
          <ProtectedRoute
            condition={isAuthenticated && user.type === 'user'}
            path="/orders"
            component={Orders}
          />

          <ProtectedRoute
            condition={isAuthenticated && user.type === 'caterer'}
            exact
            path="/caterer"
            component={CatererHome}
          />
          <ProtectedRoute
            condition={isAuthenticated && user.type === 'caterer'}
            path="/caterer/meals"
            component={CatererMealOptions}
          />
          <ProtectedRoute
            condition={isAuthenticated && user.type === 'caterer'}
            path="/caterer/order-history"
            component={CatererOrderHistory}
          />
          <ProtectedRoute
            condition={isAuthenticated && user.type === 'caterer'}
            path="/caterer/todays-orders"
            component={CatererTodaysOrders}
          />
          <ProtectedRoute
            condition={isAuthenticated && user.type === 'caterer'}
            path="/caterer/menu"
            component={CatererManageMenu}
          />
        </Suspense>
        <Route component={NotFound} />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(withRouter(App));
