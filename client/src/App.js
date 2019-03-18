import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import UserLogin from './components/Forms/UserLogin/UserLogin';
import UserRegister from './components/Forms/UserRegister/UserRegister';
import Menu from './containers/Menu/Menu';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={UserLogin} />
        <Route path="/register" component={UserRegister} />
        <Route path="/menu" component={Menu}/>
      </Switch>
    );
  }
}

export default App;
