import React from 'react';
import classes from './Meal.module.css';

const meal = props => {
  const menuMealsDetails = (
    <div className={classes.Menu__food__item__details}>
      <div className={classes.Meal__info}>
        <p>{props.meal.name}</p>
        <p>${props.meal.price.toFixed(2)}</p>
      </div>
      <div>
        <button className={classes.Card__btn} onClick={() => props.order(props.meal.id)}>
          Order
        </button>
      </div>
    </div>
  );
  const ordersMealsDetails = (
    <div className={classes.Menu__food__item__details}>
      <div className={classes.Meal__info}>
        <p>{props.meal.name}</p>
        <p>${props.meal.price.toFixed(2)}</p>
        <p>
          <button className={classes.Tiny__btn} onClick={props.decreaseQuantity}>-</button> {props.meal.quantity} <button className={classes.Tiny__btn} onClick={props.increaseQuantity}>+</button>
        </p>
      </div>
      <div className={classes.Meal__btn}>
        <button className={classes.Card__btn} onClick={props.deleteOrder}>Delete</button>
      </div>
    </div>
  );
  return (
    <article className={classes.Menu__food__item}>
      <div className={classes.Menu__food__item__img}>
        <img src={props.meal.imageUrl} alt="Meal" />
      </div>
      { props.orders ? ordersMealsDetails : menuMealsDetails }
    </article>
  );
};

export default meal;