import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/action/index';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import MealList from '../../../components/MealList/MealList';
import Loading from '../../../components/UI/Loading/Loading';
import Modal from '../../../components/UI/Modal/Modal';
import Empty from '../../../components/UI/Empty/Empty';
import client from '../../../shared/axios-client';
import withHttpHandler from '../../../hoc/withHttpHandler/withHttpHandler';

class CatererMealOptions extends Component {
  state = {
    mealToBeUpdated: null,
    editingMeal: false
  }

  componentDidMount() {
    this.props.onFetchMeals();
  }

  handleAddToMeal = formData => {
    this.props.onAddMeal(formData);
    if (this.props.resCode === 'success') {
      this.props.onResetResCode();
      this.props.onToggleModal();
      window.location.reload();
    }
  };

  handleEditMeal = (mealId,formData) => {
    this.props.onUpdateMeal(mealId,formData);
    // if (this.props.resCode === 'success') {
    //   this.props.onResetResCode();
    //   this.props.onToggleModal();
    //   window.location.reload();
    // }
  };

  deleteMealOption = mealId => {
    this.props.onDeleteMeal(mealId);
    window.location.reload();
  };

  showEditMealModal = (meal) => {
    this.setState({ mealToBeUpdated: meal });
    this.props.onToggleModal();
  };

  render() {
    let meals = (
      <MealList
        type="mealOptions"
        meals={this.props.meals}
        toggleMealModal={this.props.onToggleModal}
        removeMeal={this.deleteMealOption}
        showEditMealModal={this.showEditMealModal}
      />
    );
    if (this.props.loading) {
      meals = <Loading />;
    }
    if (!this.props.loading && this.props.meals.length === 0) {
      meals = <Empty text="Meal Options" />;
    }
    return (
      <React.Fragment>
        <Header
          bannerText="Your Meal Options"
          authenticated={this.props.catererAuthenticated}
          overlay={this.props.showModal}
          caterer
        />
        <main>{meals}</main>
        <Modal
          type="meal"
          show={this.props.showModal}
          editMeal={this.handleEditMeal}
          edittingMeal={this.state.mealToBeUpdated}
          addMeal={this.handleAddToMeal}
          close={this.props.onToggleModal}
        />
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.meal.loading,
    catererAuthenticated: state.auth.catererAuthenticated,
    meals: state.meal.meals,
    showModal: state.meal.showMealModal,
    resCode: state.global.lastReq
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchMeals: () => dispatch(actions.mealFetchMeals()),
    onToggleModal: () => dispatch(actions.toggleMealModal()),
    onAddMeal: formData => dispatch(actions.mealAddMeal(formData)),
    onResetResCode: () => dispatch(actions.resetResCode()),
    onDeleteMeal: mealId => dispatch(actions.mealDeleteMeal(mealId)),
    onUpdateMeal: (mealId, mealData) => dispatch(actions.mealUpdateMeal(mealId, mealData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withHttpHandler(CatererMealOptions, client));
