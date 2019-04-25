import React, { Component } from 'react';
import BodyClassName from 'react-body-classname';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class Home extends Component {
  render() {
    return (
      <BodyClassName className="home-page">
        <React.Fragment>
          <Header homepage />
          <Footer />
        </React.Fragment>
      </BodyClassName>
    );
  }
}

export default Home;
