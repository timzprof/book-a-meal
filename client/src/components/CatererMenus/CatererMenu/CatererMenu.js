import React from 'react';
import classes from './Menu.module.css';
import Meal from '../../MealList/Meal/Meal';

const catererMenu = props => {
  const meals = props.meals.map(meal => {
    return <Meal key={meal.id} meal={meal} order={props.handleQuantity} />;
  });
  return (
    <section className={['page-section', classes.Menu].join(' ')}>
      <div className={classes.Menu__label}>
        <h3>{props.catering_service}</h3>
      </div>
      <div className={classes.Menu__food}>{meals}</div>
    </section>
  );
};

export default catererMenu;
