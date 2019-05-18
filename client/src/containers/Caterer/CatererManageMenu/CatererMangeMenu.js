import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import MealList from '../../../components/MealList/MealList';
import Loading from '../../../components/UI/Loading/Loading';
import Empty from '../../../components/UI/Empty/Empty';
import client from '../../../shared/axios-client';
import * as actions from '../../../store/action/index';
import withHttpHandler from '../../../hoc/withHttpHandler/withHttpHandler';

class CatererManageMenu extends Component {
  componentDidMount(){
    this.props.onFetchCatererMenu();
  }

  increaseQuantity = mealId => {
    this.setState(prevState => {
      const data = { ...prevState.data };
      const mealIndex = data.meals.findIndex(meal => meal.id === mealId);
      data.meals[mealIndex].quantity += 1;
      return { data };
    });
  };

  decreaseQuantity = mealId => {
    this.setState(prevState => {
      const data = { ...prevState.data };
      const mealIndex = data.meals.findIndex(meal => meal.id === mealId);
      data.meals[mealIndex].quantity -= 1;
      return { data };
    });
  };

  saveMenu = () => {};

  render() {
    let menu = (
      <MealList
            type="manageMenu"
            meals={this.props.menuMeals}
            increase={this.increaseQuantity}
            decrease={this.decreaseQuantity}
          />
    );
    if (this.props.loading) {
      menu = <Loading />;
    }
    if (!this.props.loading && !this.props.menuMeals) {
      menu = <Empty text="Menu" />;
    }
    return (
      <React.Fragment>
        <Header
          bannerText="Increase Food Options Quantity to add them to menu"
          authenticated={this.props.catererAuthenticated}
          caterer
        />
        <main>
          {menu}
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.menu.loading,
    menuMeals: state.menu.catererMenu,
    catererAuthenticated: state.auth.catererAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCatererMenu: () => dispatch(actions.menuFetchSingleMenu())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withHttpHandler(CatererManageMenu, client));
