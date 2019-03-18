import React, { Component } from 'react';
import BodyClassName from 'react-body-classname';
import Aux from '../../hoc/auxiliary';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class Home extends Component {
  render() {
    return (
      <BodyClassName className="home-page">
        <Aux>
          <Header homepage />
          <Footer />
        </Aux>
      </BodyClassName>
    );
  }
}

export default Home;
