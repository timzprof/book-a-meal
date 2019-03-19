import React, { Component } from 'react';
import Aux from '../../hoc/auxiliary';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CatererMenus from '../../components/CatererMenus/CatererMenus';
import QuantityModal from '../../components/UI/Modal/QuantityModal/QuantityModal';

class Menu extends Component {
  state = {
    catererData: [
      {
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
    ],
    beingOrdered: null
  };

  handleQuantity = mealId => {
    const menus = [...this.state.catererData];
    menus.forEach(menu => {
      const mealIndex = menu.meals.findIndex(meal => meal.id === mealId);
      this.setState({ beingOrdered: menu.meals[mealIndex] });
    });
  };

  closeModal = () => {
    this.setState({ beingOrdered: null });
  };

  render() {
    return (
      <Aux>
        <Header
          bannerText="Today's Menus"
          authenticated
          overlay={this.state.beingOrdered !== null}
        />
        <main>
          <CatererMenus catererData={this.state.catererData} handleQuantity={this.handleQuantity} />
        </main>
        <QuantityModal
          meal={this.state.beingOrdered}
          closeModal={this.closeModal}
        />
        <Footer />
      </Aux>
    );
  }
}

export default Menu;
