import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../CatererMenus/CatererMenu/Menu.module.css';
import Meal from './Meal/Meal';

const mealList = props => {
  const meals = props.meals.map(meal => {
    return <Meal key={meal.id} meal={meal} {...props} />;
  });
  const sectionClasses = ['page-section'];
  let topBtn = null;
  let bottomBtn = null;
  switch (props.type) {
    case 'orders':
      sectionClasses.push(classes.Cart__container);
      bottomBtn = (
        <button className={classes.Right__Btn__lg} onClick={props.checkout}>
          Make Order
        </button>
      );
      break;
    case 'manageMenu':
      bottomBtn = (
        <button className={['Btn', classes.Right__Btn__lg].join(' ')} onClick={props.saveMenu}>
          Save
        </button>
      );
      break;
    case 'menuMeals':
      topBtn = (
        <Link to="/admin/menu" className={['Btn', classes.Right__Btn__lg].join(' ')}>
          Manage Menu
        </Link>
      );
      break;
    case 'mealOptions':
      topBtn = (
         <button
          className={['Btn', classes.Right__Btn__lg].join(' ')}
          onClick={props.toggleMealModal}
        >
          Add Meal Option
        </button>
      );
      break;
    default:
      break;
  }
  return (
    <section className={sectionClasses.join(' ')}>
      {topBtn}
      <div className={classes.Menu__food}>{meals}</div>
      {bottomBtn}
    </section>
  );
};

export default mealList;
