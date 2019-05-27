import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import MealList from '../../../components/MealList/MealList';
import Loading from '../../../components/UI/Loading/Loading';
import Empty from '../../../components/UI/Empty/Empty';
import client from '../../../shared/axios-client';
import * as actions from '../../../store/action/index';
import withHttpHandler from '../../../hoc/withHttpHandler/withHttpHandler';

class CatererManageMenu extends Component {
  state = {
    meals: [],
    redirect: false,
    redirectPath: null
  };

  componentDidMount() {
    this.props.onFetchCatererMeals();
  }

  componentWillReceiveProps(props) {
    this.setState({ meals: props.meals });
  }

  increaseQuantity = mealId => {
    const meals = [...this.state.meals];
    const mealIndex = meals.findIndex(meal => meal.id === mealId);
    meals[mealIndex].quantity += 1;
    this.setState({ meals });
  };

  decreaseQuantity = mealId => {
    const meals = [...this.state.meals];
    const mealIndex = meals.findIndex(meal => meal.id === mealId);
    meals[mealIndex].quantity -= 1;
    this.setState({ meals });
  };

  saveMenu = () => {
    const mealsData = [];
    this.state.meals.forEach(meal => {
      if (meal.quantity > 0) {
        mealsData.push({ mealId: meal.id, quantity: meal.quantity });
      }
    });
    this.props.onAddMealToMenu(mealsData);
    this.setState({ redirect: true, redirectPath: '/admin/' });
  };

  render() {
    let meals = (
      <MealList
        type="manageMenu"
        meals={this.state.meals}
        increase={this.increaseQuantity}
        decrease={this.decreaseQuantity}
        saveMenu={this.saveMenu}
      />
    );
    if (this.props.loading || this.state.addingMeals) {
      meals = <Loading />;
    }
    if (!this.props.loading && this.props.meals.length === 0) {
      meals = <Empty text="Meal Options" />;
    }
    return (
      <React.Fragment>
        {this.state.redirect ? <Redirect to={this.state.redirectPath} /> : null}
        <Header
          bannerText="Increase Food Options Quantity to add them to menu"
          authenticated={this.props.catererAuthenticated}
          caterer
        />
        <main>{meals}</main>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.meal.loading,
    catererAuthenticated: state.auth.catererAuthenticated,
    meals: state.meal.meals
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCatererMeals: () => dispatch(actions.mealFetchMeals()),
    onAddMealToMenu: data => dispatch(actions.menuAddMealsToMenu(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withHttpHandler(CatererManageMenu, client));
