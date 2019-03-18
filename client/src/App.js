import React, { Component } from 'react';
import Home from './containers/Home/Home';
import UserLogin from './components/Forms/UserLogin/UserLogin';
import UserRegister from './components/Forms/UserRegister/UserRegister';
import Menu from './containers/Menu/Menu';

class App extends Component {
  render() {
    return (
      <Menu />
    );
  }
}

export default App;
