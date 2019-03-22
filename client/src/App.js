import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import UserLogin from './components/Forms/UserLogin/UserLogin';
import UserRegister from './components/Forms/UserRegister/UserRegister';
import Menu from './containers/Menu/Menu';
import OrderHistory from './containers/OrderHistory/OrderHistory';
import Orders from './containers/Orders/Orders';
import CatererHome from './containers/Caterer/CatererHome/CatererHome';

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
        <Route path="/admin/" component={CatererHome} />
      </Switch>
    );
  }
}

export default App;
