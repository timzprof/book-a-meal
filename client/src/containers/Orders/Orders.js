import React, { Component } from 'react';
import Aux from '../../hoc/auxiliary';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import MealList from '../../components/MealList/MealList';
import Modal from '../../components/UI/Modal/Modal';

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
    },
    checkingOut: false
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

  showCheckoutModal = () => {
    this.setState({ checkingOut: true });
  }

  hideCheckoutModal = () => {
    this.setState({ checkingOut: false });
  }

  render() {
    return (
      <Aux>
        <Header bannerText="Your Order Summary" authenticated overlay={this.state.checkingOut} />
        <main>
          <MealList
            type="orders"
            meals={this.state.orderData.meals}
            increaseQuantity={this.increaseQuantity}
            decreaseQuantity={this.decreaseQuantity}
            deleteOrder={this.deleteOrder}
            checkout={this.showCheckoutModal}
          />
        </main>
        <Footer />
        <Modal type="checkout" show={this.state.checkingOut} close={this.hideCheckoutModal} />
      </Aux>
    );
  }
}

export default Orders;
