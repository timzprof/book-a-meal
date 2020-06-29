import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CatererMenus from '../../components/CatererMenus/CatererMenus';
import Modal from '../../components/UI/Modal/Modal';
import Loading from '../../components/UI/Loading/Loading';
import Empty from '../../components/UI/Empty/Empty';

import {
  handleQuantity,
  hideQuantityModal,
  menuFetchMenus,
  orderAddToOrders
} from '../../redux/action';

class Menu extends PureComponent {
  componentDidMount() {
    this.props.onFetchMenus();
  }

  addMealToOrders = orderData => {
    this.props
      .onAddToOrders(orderData)
      .then(() => this.props.history.push('/orders'))
      .catch(error => console.log(error));
  };

  render() {
    const { loading, menus, beingOrdered, onHandleQuantity, onHideQuantityModal } = this.props;
    return (
      <>
        <Header bannerText="Today's Menus" overlay={beingOrdered} />
        <main>
          {loading ? (
            <Loading />
          ) : !loading && menus.length === 0 ? (
            <Empty text="Menu" />
          ) : (
            <CatererMenus catererData={menus} handleQuantity={onHandleQuantity} />
          )}
        </main>
        <Modal
          meal={beingOrdered}
          type="quantity"
          show={beingOrdered !== null}
          close={onHideQuantityModal}
          orderMeal={this.addMealToOrders}
        />
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    beingOrdered: state.menu.beingOrdered,
    loading: state.menu.loading,
    menus: state.menu.menus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onHandleQuantity: mealId => dispatch(handleQuantity(mealId)),
    onHideQuantityModal: () => dispatch(hideQuantityModal()),
    onFetchMenus: () => dispatch(menuFetchMenus()),
    onAddToOrders: order => dispatch(orderAddToOrders(order))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Menu));
