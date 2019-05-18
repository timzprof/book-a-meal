import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import * as actions from '../../store/action/index';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import MealList from '../../components/MealList/MealList';
import Modal from '../../components/UI/Modal/Modal';
import Loading from '../../components/UI/Loading/Loading';
import client from '../../shared/axios-client';
import withHttpHandler from '../../hoc/withHttpHandler/withHttpHandler';
import Empty from '../../components/UI/Empty/Empty';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps.orderMeals,this.props.orderMeals);
  }

  handleOrderDelete = orderItemId => {
    this.props.onOrderDelete(orderItemId);
  };

  handleOrderIncrement = orderItemId => {
    this.props.onOrderIncrement(orderItemId);
  };

  handleOrderDecrement = orderItemId => {
    this.props.onOrderDecrement(orderItemId);
  };

  showCheckoutModal = () => {
    this.setState({ checkingOut: true });
  };

  hideCheckoutModal = () => {
    this.setState({ checkingOut: false });
  };

  render() {
    let orders = (
      <MealList
        type="orders"
        meals={this.props.orderMeals}
        increaseQuantity={this.handleOrderIncrement}
        decreaseQuantity={this.handleOrderDecrement}
        deleteOrder={this.handleOrderDelete}
        checkout={this.showCheckoutModal}
      />
    );
    if (this.props.loading) {
      orders = <Loading />;
    }
    if (!this.props.loading && this.props.orderMeals.length === 0) {
      orders = <Empty text="Orders" />;
    }
    return (
      <React.Fragment>
        <Header bannerText="Your Order Summary" authenticated overlay={this.props.checkingOut} />
        <main>{orders}</main>
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
    onOrderDecrement: orderItemId => dispatch(actions.orderDecrement(orderItemId)),
    onOrderDelete: orderItemId => dispatch(actions.orderDelete(orderItemId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withHttpHandler(Orders, client));
