import React, { Component } from 'react';
import Aux from '../../hoc/auxiliary';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class Menu extends Component {
  render() {
    return (
      <Aux>
        <Header bannerText="Today's Menus" />
        <Footer />
      </Aux>
    );
  }
}

export default Menu;