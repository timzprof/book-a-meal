import React, { Component } from 'react';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import MealList from '../../../components/MealList/MealList';

class CatererManageMenu extends Component {
  state = {
    data: {
      meals: [
        {
          id: 1,
          name: 'Jollof Rice',
          price: 500,
          imageUrl: 'http://foodhub.ng/wp-content/uploads/2018/12/jollof-rice-cooking.jpg',
          quantity: 5
        },
        {
          id: 2,
          name: 'Bread & Beans',
          price: 500,
          imageUrl:
            'https://thumbs.dreamstime.com/b/plate-ewa-agoyin-agege-bread-nigerian-staple-meal-consisting-baked-beans-red-palm-oil-stew-sauce-90622030.jpg',
          quantity: 5
        }
      ],
      catering_service: 'Book A Meal Caterer'
    }
  }
  increaseQuantity = (mealId) => {
    this.setState((prevState) => {
      const data = {...prevState.data};
      const mealIndex = data.meals.findIndex(meal => meal.id === mealId);
      data.meals[mealIndex].quantity += 1;
      return { data };
    });
  };

  decreaseQuantity = (mealId) => {
    this.setState((prevState) => {
      const data = { ...prevState.data };
      const mealIndex = data.meals.findIndex(meal => meal.id === mealId);
      data.meals[mealIndex].quantity -= 1;
      return { data };
    });
  };

  saveMenu = () => {};

  render() {
    return (
      <React.Fragment>
        <Header
          bannerText="Increase Food Options Quantity to add them to menu"
          authenticated
          caterer
        />
        <main>
          <MealList
            type="manageMenu"
            meals={this.state.data.meals}
            increase={this.increaseQuantity}
            decrease={this.decreaseQuantity}
          />
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default CatererManageMenu;
