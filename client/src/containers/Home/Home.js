import React , { Component } from 'react';
import Aux from '../../hoc/auxiliary';
import Header from '../../components/Header/Header';
import HomeBanner from '../../components/HomeBanner/HomeBanner';
import Footer from '../../components/Footer/Footer';

class Home extends Component {
  componentWillMount() {
    document.body.classList.add('home-page');
  }
  render() {
    return (
      <Aux>
        <Header page='Home'/>
        <HomeBanner />
        <Footer />
      </Aux>
    );
  }
}

export default Home;