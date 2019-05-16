import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/action/index';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import MealList from '../../components/MealList/MealList';
import Modal from '../../components/UI/Modal/Modal';
import Loading from '../../components/UI/Loading/Loading';
import client from '../../shared/axios-client';
import withHttpHandler from '../../hoc/withHttpHandler/withHttpHandler';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }
  deleteOrder = () => {
    console.log('Delete');
  };

  showCheckoutModal = () => {
    this.setState({ checkingOut: true });
  };

  hideCheckoutModal = () => {
    this.setState({ checkingOut: false });
  };

  render() {
    return (
      <React.Fragment>
        <Header bannerText="Your Order Summary" authenticated overlay={this.props.checkingOut} />
        <main>
          {!this.props.loading || this.props.orderMeals.length !== 0 ? (
            <MealList
              type="orders"
              meals={this.props.orderMeals}
              increaseQuantity={this.props.onOrderIncrement}
              decreaseQuantity={this.props.onOrderDecrement}
              deleteOrder={this.deleteOrder}
              checkout={this.showCheckoutModal}
            />
          ) : (
            <Loading />
          )}
        </main>
        <Footer />
        <Modal type="checkout" show={this.props.checkingOut} close={this.hideCheckoutModal} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    orderMeals: state.orders.orderMeals,
    checkingOut: state.orders.checkingOut,
    loading: state.orders.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.orderFetchUserOrders()),
    onOrderIncrement: orderItemId => dispatch(actions.orderIncrement(orderItemId)),
    onOrderDecrement: orderItemId => dispatch(actions.orderDecrement(orderItemId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withHttpHandler(Orders, client));
