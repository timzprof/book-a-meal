import React from 'react';
import classes from './CatererMenu.module.css';
import Meal from '../../Meal/Meal';

const catererMenu = props => {
  const meals = props.meals.map(meal => {
    return <Meal key={meal.id} name={meal.name} price={meal.price} image={meal.imageUrl} />;
  });
  return (
    <section className={['page-section', classes.Menu].join(' ')}>
      <div className={classes.Menu__label}>
        <h3>{props.catering_service}</h3>
      </div>
      <div className={classes.Menu__food}>
        { meals }
      </div>
    </section>
  );
};

export default catererMenu;
