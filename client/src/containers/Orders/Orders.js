import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import MealList from '../../components/MealList/MealList';
import Modal from '../../components/UI/Modal/Modal';
import Loading from '../../components/UI/Loading/Loading';

import { orderUpdate, orderFetchUserOrders, orderDelete, orderCheckout } from '../../redux/action';

class Orders extends Component {
  state = {
    checkingOut: false
  };
  componentDidMount() {
    this.props.onFetchOrders();
  }

  handleOrderDelete = orderItemId => {
    this.props.onOrderDelete(orderItemId);
  };

  handleOrderIncrement = orderItemId => {
    this.props.onOrderUpdate(orderItemId, 'increase');
  };

  handleOrderDecrement = orderItemId => {
    this.props.onOrderUpdate(orderItemId, 'decrease');
  };

  showCheckoutModal = () => {
    this.setState({ checkingOut: true });
  };

  hideCheckoutModal = () => {
    this.setState({ checkingOut: false });
  };

  render() {
    const { loading, onOrderCheckout } = this.props;
    const { checkingOut } = this.state;
    return (
      <>
        <Header bannerText="Your Order Summary" overlay={checkingOut} />
        <main>
          {loading ? (
            <Loading />
          ) : (
            <MealList
              type="orders"
              meals={this.props.orderMeals}
              increaseQuantity={this.handleOrderIncrement}
              decreaseQuantity={this.handleOrderDecrement}
              deleteOrder={this.handleOrderDelete}
              checkout={this.showCheckoutModal}
            />
          )}
        </main>
        <Footer />
        <Modal
          type="checkout"
          show={checkingOut}
          checkout={onOrderCheckout}
          close={this.hideCheckoutModal}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    orderMeals: state.orders.userOrderMeals,
    loading: state.orders.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(orderFetchUserOrders()),
    onOrderUpdate: (orderItemId, action) => dispatch(orderUpdate(orderItemId, action)),
    onOrderDelete: orderItemId => dispatch(orderDelete(orderItemId)),
    onOrderCheckout: data => dispatch(orderCheckout(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
