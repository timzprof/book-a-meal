import React, { Suspense, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './containers/Home/Home';
import Loading from './components/UI/Loading/Loading';
import './iziToast.min.css';
import useGlobal from './store';

const UserLogin = lazy(() => import('./components/Forms/UserLogin/UserLogin'));
const UserRegister = lazy(() => import('./components/Forms/UserRegister/UserRegister'));
const CatererLogin = lazy(() => import('./components/Forms/CatererLogin/CatererLogin'));
const CatererRegister = lazy(() => import('./components/Forms/CatererRegister/CatererRegister'));
const Menu = lazy(() => import('./containers/Menu/Menu'));
const OrderHistory = lazy(() => import('./containers/OrderHistory/OrderHistory'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const CatererHome = lazy(() => import('./containers/Caterer/CatererHome/CatererHome'));
const CatererMealOptions = lazy(() => import('./containers/Caterer/CatererMealOptions/CatererMealOptions'));
const CatererOrderHistory = lazy(() => import('./containers/Caterer/CatererOrderHistory/CatererOrderHistory'));
const CatererTodaysOrders = lazy(() => import('./containers/Caterer/CatererTodaysOrders/CatererTodaysOrders'));
const CatererManageMenu = lazy(() => import('./containers/Caterer/CatererManageMenu/CatererMangeMenu'));
const NotFound = lazy(() => import('./components/UI/NotFound/Notfound'));


const App = () => {
  const [globalState] = useGlobal();

  const ProtectedUserRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        globalState.userAuthenticated ? (
          <Suspense fallback={<Loading />}>
            <Component {...props} />
          </Suspense>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  const ProtectedCatererRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        globalState.catererAuthenticated ? (
          <Suspense fallback={<Loading />}>
            <Component {...props} />
          </Suspense>
        ) : (
          <Redirect to="/admin/login" />
        )
      }
    />
  );

  const LazyRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props => (
        <Suspense fallback={<Loading />}>
          <Component {...props} />
        </Suspense>
      )}
    />
  );
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <LazyRoute path="/login" component={UserLogin} />
      <LazyRoute path="/register" component={UserRegister} />
      <ProtectedUserRoute path="/menu" component={Menu} />
      <ProtectedUserRoute path="/order-history" component={OrderHistory} />
      <ProtectedUserRoute path="/orders" component={Orders} />
      <ProtectedCatererRoute exact path="/admin/" component={CatererHome} />
      <LazyRoute path="/admin/login" component={CatererLogin} />
      <LazyRoute path="/admin/register" component={CatererRegister} />
      <ProtectedCatererRoute path="/admin/meals" component={CatererMealOptions} />
      <ProtectedCatererRoute path="/admin/order-history" component={CatererOrderHistory} />
      <ProtectedCatererRoute path="/admin/todays-orders" component={CatererTodaysOrders} />
      <ProtectedCatererRoute path="/admin/menu" component={CatererManageMenu} />
      <LazyRoute component={NotFound} />
    </Switch>
  );
};

export default App;
