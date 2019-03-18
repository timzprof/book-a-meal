import React from 'react';
import classes from './Meal.module.css';

const meal = (props) => {
  return (
    <article className={classes.Menu__food__item}>
      <div className={classes.Menu__food__item__img}>
        <img src={props.image} alt="Meal" />
      </div>
      <div className={classes.Menu__food__item__details}>
        <div className={classes.Meal__info}>
          <p>{props.name}</p>
          <p>${props.price.toFixed(2)}</p>
        </div>
        <div>
          <button className={classes.Card__btn}>Order</button>
        </div>
      </div>
    </article>
  );
};  

export default meal;