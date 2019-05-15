import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/action/index';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import MealList from '../../components/MealList/MealList';
import Modal from '../../components/UI/Modal/Modal';
import Loading from '../../components/UI/Loading/Loading';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

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
              increaseQuantity={this.increaseQuantity}
              decreaseQuantity={this.decreaseQuantity}
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
    onFetchOrders: () => dispatch(actions.orderFetchUserOrders())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
