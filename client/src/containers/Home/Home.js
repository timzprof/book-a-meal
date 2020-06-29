import React, { PureComponent } from 'react';
import BodyClassName from 'react-body-classname';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class Home extends PureComponent {
  render() {
    return (
      <BodyClassName className="home-page">
        <>
          <Header homepage />
          <Footer />
        </>
      </BodyClassName>
    );
  }
}

export default Home;
