import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../CatererMenus/CatererMenu/Menu.module.css';

import Meal from './Meal/Meal';
import Empty from '../UI/Empty/Empty';

const generateBtns = (sectionClasses, type, { checkout, saveMenu, toggleMealModal }) => {
  let topBtn = null;
  let bottomBtn = null;
  switch (type) {
    case 'orders':
      sectionClasses.push(classes.Cart__container);
      bottomBtn = (
        <button className={classes.Right__Btn__lg} onClick={checkout}>
          Make Order
        </button>
      );
      break;
    case 'manageMenu':
      bottomBtn = (
        <button className={['Btn', classes.Right__Btn__lg].join(' ')} onClick={saveMenu}>
          Save
        </button>
      );
      break;
    case 'menuMeals':
      topBtn = (
        <Link to="/caterer/menu" className={['Btn', classes.Right__Btn__lg].join(' ')}>
          Manage Menu
        </Link>
      );
      break;
    case 'mealOptions':
      topBtn = (
        <button className={['Btn', classes.Right__Btn__lg].join(' ')} onClick={toggleMealModal}>
          Add Meal Option
        </button>
      );
      break;
    default:
      break;
  }
  return { top: topBtn, bottom: bottomBtn };
};

const emptyText = type => {
  switch (type) {
    case 'orders':
      return 'Orders';
    case 'menuMeals':
      return 'Menu';
    case 'manageMenu':
    case 'mealOptions':
      return 'Meal Options';
    default:
      return '';
  }
};

const MealList = props => {
  const role = {
    meals: 'meals'
  };
  const { type, meals, checkout, saveMenu, toggleMealModal } = props;
  const sectionClasses = ['page-section'];
  const btns = generateBtns(sectionClasses, type, { checkout, saveMenu, toggleMealModal });
  return (
    <section className={sectionClasses.join(' ')} role={role.meals}>
      {btns.top}
      <div className={classes.Menu__food}>
        {meals.length === 0 ? (
          <Empty text={emptyText(type)} />
        ) : (
          meals.map(meal => {
            return <Meal key={meal.id} meal={meal} {...props} />;
          })
        )}
      </div>
      {btns.bottom}
    </section>
  );
};

export default MealList;
