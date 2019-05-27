import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import MealList from '../../../components/MealList/MealList';
import Loading from '../../../components/UI/Loading/Loading';
import Empty from '../../../components/UI/Empty/Empty';
import client from '../../../shared/axios-client';
import * as actions from '../../../store/action/index';
import withHttpHandler from '../../../hoc/withHttpHandler/withHttpHandler';

class CatererHome extends Component {
  
  componentDidMount() {
    this.props.onFetchCatererMenu();
    this.props.onSetAuthRedirect();
  }

  render() {
    let menu = <MealList type="menuMeals" meals={this.props.menuMeals} />;
    if (this.props.loading) {
      menu = <Loading />;
    }
    if (!this.props.loading && !this.props.menuMeals) {
      menu = (
        <section className="page-section">
          <Link to="/admin/menu" className={['Btn', 'Right__Btn__lg'].join(' ')}>
            Manage Menu
          </Link>
          <Empty text="Menu" />
        </section>
      );
    }
    return (
      <React.Fragment>
        <Header
          bannerText="Your Menu for Today"
          authenticated={this.props.catererAuthenticated}
          caterer
        />
        <main>{menu}</main>
        <Footer />
      </React.Fragment>
    );
  }
}
 
const mapStateToProps = state => {
  let menuMeals = [];
  if(state.menu.catererMenu.meals) menuMeals = JSON.parse(state.menu.catererMenu.meals);
  return {
    loading: state.menu.loading,
    menuMeals,
    catererAuthenticated: state.auth.catererAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCatererMenu: () => dispatch(actions.menuFetchSingleMenu()),
    onSetAuthRedirect: () => dispatch(actions.setAuthRedirect(null))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withHttpHandler(CatererHome, client));
