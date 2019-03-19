import React from 'react';
import classes from './Meal.module.css';

const meal = (props) => {
  return (
    <article className={classes.Menu__food__item}>
      <div className={classes.Menu__food__item__img}>
        <img src={props.meal.imageUrl} alt="Meal" />
      </div>
      <div className={classes.Menu__food__item__details}>
        <div className={classes.Meal__info}>
          <p>{props.meal.name}</p>
          <p>${props.meal.price.toFixed(2)}</p>
        </div>
        <div>
          <button className={classes.Card__btn} onClick={() => props.clicked(props.meal.id)}>Order</button>
        </div>
      </div>
    </article>
  );
};  

export default meal;