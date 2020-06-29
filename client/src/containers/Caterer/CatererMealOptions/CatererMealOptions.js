import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import MealList from '../../../components/MealList/MealList';
import Loading from '../../../components/UI/Loading/Loading';
import Modal from '../../../components/UI/Modal/Modal';

import {
  mealAddMeal,
  mealDeleteMeal,
  mealFetchMeals,
  toggleMealModal,
  mealUpdateMeal
} from '../../../redux/action';

class CatererMealOptions extends Component {
  state = {
    mealToBeUpdated: null,
    editingMeal: false
  };

  componentDidMount() {
    this.props.onFetchMeals();
  }

  handleAddToMeal = formData => {
    this.props
      .onAddMeal(formData)
      .then(() => {
        this.props.onToggleModal();
      })
      .catch(error => console.log(error));
  };

  handleEditMeal = (mealId, formData) => {
    this.props
      .onUpdateMeal(mealId, formData)
      .then(() => {
        this.props.onToggleModal();
      })
      .catch(error => console.log(error));
  };

  deleteMealOption = mealId => {
    this.props.onDeleteMeal(mealId).catch(error => console.log(error));
  };

  showEditMealModal = meal => {
    this.setState({ mealToBeUpdated: { ...meal } });
    this.props.onToggleModal();
  };

  render() {
    const { loading, meals, showModal, onToggleModal } = this.props;
    return (
      <>
        <Header bannerText="Your Meal Options" overlay={showModal} />
        <main>
          {loading ? (
            <Loading />
          ) : (
            <MealList
              type="mealOptions"
              meals={meals}
              toggleMealModal={onToggleModal}
              removeMeal={this.deleteMealOption}
              showEditMealModal={this.showEditMealModal}
            />
          )}
        </main>
        <Modal
          type="meal"
          show={showModal}
          editMeal={this.handleEditMeal}
          edittingMeal={this.state.mealToBeUpdated}
          addMeal={this.handleAddToMeal}
          close={onToggleModal}
        />
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.meal.loading,
    meals: state.meal.meals,
    showModal: state.meal.showMealModal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchMeals: () => dispatch(mealFetchMeals()),
    onToggleModal: () => dispatch(toggleMealModal()),
    onAddMeal: formData => dispatch(mealAddMeal(formData)),
    onDeleteMeal: mealId => dispatch(mealDeleteMeal(mealId)),
    onUpdateMeal: (mealId, mealData) => dispatch(mealUpdateMeal(mealId, mealData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CatererMealOptions));
