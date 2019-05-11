import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CatererMenus from '../../components/CatererMenus/CatererMenus';
import Modal from '../../components/UI/Modal/Modal';
import * as actions from '../../store/action/index';

class Menu extends Component {
  render(){
  return (
    <React.Fragment>
      <Header bannerText="Today's Menus" authenticated={this.props.userAuthenticated} overlay={this.props.beingOrdered} />
      <main>
        <CatererMenus catererData={this.props.menu} handleQuantity={this.props.onHandleQuantity} />
      </main>
      <Modal
        meal={this.props.beingOrdered}
        type="quantity"
        show={this.props.beingOrdered !== null}
        close={this.props.onHideQuantityModal}
      />
      <Footer />
    </React.Fragment>
  );
  }
};

const mapStateToProps = state => {
  return {
    userAuthenticated: state.auth.userAuthenticated,
    beingOrdered: state.menu.beingOrdered,
    menu: state.menu.meals
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onHandleQuantity: (mealId) => dispatch(actions.handleQuantity(mealId)),
    onHideQuantityModal: () => dispatch(actions.hideQuantityModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
