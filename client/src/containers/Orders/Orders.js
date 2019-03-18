import React, { Component } from 'react';
import Aux from '../../hoc/auxiliary';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class Orders extends Component {
  render() {
    return (
      <Aux>
        <Header bannerText="Your Order Summary" authenticated />
        <main></main>
        <Footer />
      </Aux>
    );
  }
}

export default Orders;