import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import MealList from '../../../components/MealList/MealList';
import Loading from '../../../components/UI/Loading/Loading';

import { mealFetchMeals, menuAddMealsToMenu } from '../../../redux/action';

class CatererManageMenu extends Component {
  state = {
    meals: []
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
    this.props
      .onAddMealToMenu(mealsData)
      .then(() => {
        this.props.history.push('/caterer');
      })
      .catch(error => console.log(error));
  };

  render() {
    const { loading } = this.props;
    return (
      <>
        <Header bannerText="Increase Food Options Quantity to add them to menu" />
        <main>
          {loading ? (
            <Loading />
          ) : (
            <MealList
              type="manageMenu"
              meals={this.state.meals}
              increase={this.increaseQuantity}
              decrease={this.decreaseQuantity}
              saveMenu={this.saveMenu}
            />
          )}
        </main>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.meal.loading,
    meals: state.meal.meals
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCatererMeals: () => dispatch(mealFetchMeals()),
    onAddMealToMenu: data => dispatch(menuAddMealsToMenu(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CatererManageMenu));
