import React, { Component } from 'react';
import { connect } from 'react-redux';
import BodyClassName from 'react-body-classname';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class Home extends Component {
  render() {
    return (
      <BodyClassName className="home-page">
        <React.Fragment>
          <Header
            homepage
            caterer={this.props.catererAuthenticated}
            catererAuthenticated={this.props.catererAuthenticated}
            userAuthenticated={this.props.userAuthenticated}
          />
          <Footer />
        </React.Fragment>
      </BodyClassName>
    );
  }
}

const mapStateToProps = state => {
  return {
    userAuthenticated: state.auth.userAuthenticated,
    catererAuthenticated: state.auth.catererAuthenticated
  };
};

export default connect(mapStateToProps)(Home);
