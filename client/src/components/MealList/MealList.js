import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../CatererMenus/CatererMenu/Menu.module.css';
import Meal from './Meal/Meal';

const mealList = props => {
  const meals = props.meals.map(meal => {
    return <Meal key={meal.id} meal={meal} {...props} />;
  });
  const sectionClasses = ['page-section'];
  if (props.type === 'orders') {
    sectionClasses.push(classes.Cart__container);
  }
  return (
    <section className={sectionClasses.join(' ')}>
      {props.type === 'menuMeals' ? (
        <Link to="/admin/menu" className={['Btn', classes.Right__Btn__lg].join(' ')}>
          Manage Menu
        </Link>
      ) : null}
      {props.type === 'mealOptions' ? (
        <button
          className={['Btn', classes.Right__Btn__lg].join(' ')}
          id="add-meal-option"
          data-toggle="modal"
          data-target="#mealOptionModal"
        >
          Add Meal Option
        </button>
      ) : null}
      <div className={classes.Menu__food}>{meals}</div>
      {props.orders ? (
        <button
          className={classes.Right__Btn__lg}
          id="makeOrder"
          data-toggle="modal"
          data-target="#checkoutModal"
          onClick={props.checkout}
        >
          Make Order
        </button>
      ) : null}
    </section>
  );
};

export default mealList;
