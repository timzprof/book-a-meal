import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/action/index';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import MealList from '../../../components/MealList/MealList';
import Loading from '../../../components/UI/Loading/Loading';
import Empty from '../../../components/UI/Empty/Empty';
import client from '../../../shared/axios-client';
import withHttpHandler from '../../../hoc/withHttpHandler/withHttpHandler';

class CatererMealOptions extends Component {
  componentDidMount() {
    this.props.onFetchMeals();
  }

  removeMealFromMenu = () => {};

  showEditMealModal = () => {};

  render() {
    let meals = (
      <MealList
        type="mealOptions"
        meals={this.props.meals}
        remove={this.removeMealFromMenu}
        showEditMealModal={this.showEditMealModal}
      />
    );
    if (this.props.loading) {
      meals = <Loading />;
    }
    if (!this.props.loading && this.props.meals.length === 0) {
      meals = <Empty text="Meal Options" />;
    }
    return (
      <React.Fragment>
        <Header
          bannerText="Your Meal Options"
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
    onFetchMeals: () => dispatch(actions.mealFetchMeals())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withHttpHandler(CatererMealOptions, client));
