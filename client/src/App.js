import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
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

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={UserLogin} />
        <Route path="/register" component={UserRegister} />
        <Route path="/menu" component={Menu} />
        <Route path="/order-history" component={OrderHistory} />
        <Route path="/orders" component={Orders} />
        <Route exact path="/admin/" component={CatererHome} />
        <Route path="/admin/login" component={CatererLogin} />
        <Route path="/admin/register" component={CatererRegister} />
        <Route path="/admin/meals" component={CatererMealOptions} />
        <Route path="/admin/order-history" component={CatererOrderHistory} />
      </Switch>
    );
  }
}

export default App;
