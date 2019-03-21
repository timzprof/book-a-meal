import React from 'react';
import classes from '../CatererMenus/CatererMenu/Menu.module.css';
import Meal from './Meal/Meal';

const mealList = props => {
  let meals = null;
  const sectionClasses = ['page-section'];
  if (props.orders) {
    sectionClasses.push(classes.Cart__container);
    meals = props.meals.map(meal => {
      return (
        <Meal
          key={meal.id}
          meal={meal}
          orders
          increaseQuantity={props.increaseQuantity}
          decreaseQuantity={props.decreaseQuantity}
          deleteOrder={props.deleteOrder}
        />
      );
    });
  }
  return (
    <section className={sectionClasses.join(' ')}>
      <div className={classes.Menu__food}>{meals}</div>
      {props.orders ? (
        <button
          className={classes.Right__Btn__lg}
          id="makeOrder"
          data-toggle="modal"
          data-target="#checkoutModal"
        >
          Make Order
        </button>
      ) : null}
    </section>
  );
};

export default mealList;
