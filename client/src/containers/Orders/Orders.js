import React, { Component } from 'react';
import Aux from '../../hoc/auxiliary';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import MealList from '../../components/MealList/MealList';

class Orders extends Component {
  state = {
    orderData: {
      meals: [
        {
          id: 1,
          name: 'Jollof Rice',
          price: 500,
          imageUrl: 'http://foodhub.ng/wp-content/uploads/2018/12/jollof-rice-cooking.jpg',
          quantity: 1
        },
        {
          id: 2,
          name: 'Bread & Beans',
          price: 500,
          imageUrl:
            'https://thumbs.dreamstime.com/b/plate-ewa-agoyin-agege-bread-nigerian-staple-meal-consisting-baked-beans-red-palm-oil-stew-sauce-90622030.jpg',
          quantity: 1
        }
      ],
      catering_service: 'Book A Meal Caterer'
    }
  };

  decreaseQuantity = () => {
    console.log('Decrease');
  };
  increaseQuantity = () => {
    console.log('Increase');
  };
  deleteOrder = () => {
    console.log('Delete');
  };
  render() {
    return (
      <Aux>
        <Header bannerText="Your Order Summary" authenticated />
        <main>
          <MealList
            orders
            meals={this.state.orderData.meals}
            increaseQuantity={this.increaseQuantity}
            decreaseQuantity={this.decreaseQuantity}
            deleteOrder={this.deleteOrder}
          />
        </main>
        <Footer />
      </Aux>
    );
  }
}

export default Orders;
