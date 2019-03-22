import React, { Component } from 'react';
import Aux from '../../../hoc/auxiliary';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import MealList from '../../../components/MealList/MealList';

class CatererMealOptions extends Component {
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
  
  removeMealFromMenu = () => {};

  showEditMealModal = () => {};
  render() {
    return (
      <Aux>
        <Header bannerText="Your Meal Options" authenticated caterer />
        <main>
          <MealList
            type="mealOptions"
            meals={this.state.data.meals}
            remove={this.removeMealFromMenu}
            showEditMealModal={this.showEditMealModal}
          />
        </main>
        <Footer />
      </Aux>
    );
  }
}

export default CatererMealOptions;
