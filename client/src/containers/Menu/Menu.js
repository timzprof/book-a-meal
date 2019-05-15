import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CatererMenus from '../../components/CatererMenus/CatererMenus';
import Modal from '../../components/UI/Modal/Modal';
import Loading from '../../components/UI/Loading/Loading';
import * as actions from '../../store/action/index';

class Menu extends Component {
  componentDidMount() {
    this.props.onFetchMenus();
  }

  addMealToOrders = (orderData) => {
    this.props.onAddToOrders(orderData);
    console.log(this.props.orderResCode);
    if(this.props.orderResCode === 200){
      this.props.onResetOrderResCode();
      this.props.history.push('/orders');
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header
          bannerText="Today's Menus"
          authenticated={this.props.userAuthenticated}
          overlay={this.props.beingOrdered}
        />
        <main>
          {!this.props.loading ? (
            <CatererMenus
              catererData={this.props.menus}
              handleQuantity={this.props.onHandleQuantity}
            />
          ) : (
            <Loading />
          )}
        </main>
        <Modal
          meal={this.props.beingOrdered}
          type="quantity"
          show={this.props.beingOrdered !== null}
          close={this.props.onHideQuantityModal}
          orderMeal={this.addMealToOrders}
        />
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const menus = [];
  state.menu.menus.forEach(menu => {
    menus.push({
      id: menu.id,
      catererId: menu.catererId,
      catering_service: menu.caterer.catering_service,
      meals: JSON.parse(menu.meals)
    });
  });
  return {
    userAuthenticated: state.auth.userAuthenticated,
    beingOrdered: state.menu.beingOrdered,
    token: state.auth.token,
    loading: state.menu.loading,
    menus,
    orderResCode: state.orders.lastReq
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onHandleQuantity: mealId => dispatch(actions.handleQuantity(mealId)),
    onHideQuantityModal: () => dispatch(actions.hideQuantityModal()),
    onFetchMenus: () => dispatch(actions.menuFetchMenus()),
    onAddToOrders: order => dispatch(actions.orderAddToOrders(order)),
    onResetOrderResCode: () => dispatch(actions.resetOrderResCode())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
