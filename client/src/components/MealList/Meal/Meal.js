import React from 'react';
import classes from './Meal.module.css';

const meal = props => {
  const roles = {
    meal: 'meal',
    details: 'mealdetails',
    name: 'mealname',
    price: 'mealprice',
    quantity: 'mealquantity'
  };
  const menuMealsDetails = (
    <div className={classes.Menu__food__item__details} role={roles.details}>
      <div className={classes.Meal__info}>
        <p role={roles.name}>{props.meal.name}</p>
        <p role={roles.price}>${props.meal.price.toFixed(2)}</p>
      </div>
      <div>
        <button className={classes.Card__btn} onClick={() => props.order(props.meal.id)}>
          Order
        </button>
      </div>
    </div>
  );
  const ordersMealsDetails = (
    <div className={classes.Menu__food__item__details} role={roles.details}>
      <div className={classes.Meal__info}>
        <p role={roles.name}>{props.meal.name}</p>
        <p role={roles.price}>${props.meal.price.toFixed(2)}</p>
        <p>
          <button
            className={classes.Tiny__btn}
            onClick={() => props.decreaseQuantity(props.meal.orderId)}
          >
            -
          </button>{' '}
          {props.meal.quantity}{' '}
          <button
            className={classes.Tiny__btn}
            onClick={() => props.increaseQuantity(props.meal.orderId)}
          >
            +
          </button>
        </p>
      </div>
      <div className={classes.Meal__btn}>
        <button className={classes.Card__btn} onClick={() => props.deleteOrder(props.meal.orderId)}>
          Delete
        </button>
      </div>
    </div>
  );
  const catererMenuMeals = (
    <div className={classes.Menu__food__item__details} role={roles.details}>
      <div className={classes.Meal__info}>
        <p role={roles.name}>{props.meal.name}</p>
        <p role={roles.price}>${props.meal.price.toFixed(2)}</p>
        <p role={roles.quantity}>Quantity: {props.meal.quantity}</p>
      </div>
    </div>
  );
  const mealOptions = (
    <div className={classes.Menu__food__item__details} role={roles.details}>
      <div className={classes.Meal__info}>
        <p role={roles.name}>{props.meal.name}</p>
        <p role={roles.price}>${props.meal.price.toFixed(2)}</p>
      </div>
      <div className={classes.Meal__btn}>
        <button className={classes.Card__btn} onClick={() => props.showEditMealModal(props.meal)}>
          Edit
        </button>
      </div>
      <div className={classes.Meal__btn}>
        <button className={classes.Card__btn} onClick={() => props.removeMeal(props.meal.id)}>
          Delete
        </button>
      </div>
    </div>
  );
  const manageMenu = (
    <div className={classes.Menu__food__item__details} role={roles.details}>
      <div className={classes.Meal__info}>
        <p role={roles.name}>{props.meal.name}</p>
        <p role={roles.price}>${props.meal.price.toFixed(2)}</p>
        <p>
          <button className={classes.Tiny__btn} onClick={() => props.decrease(props.meal.id)}>
            -
          </button>{' '}
          {props.meal.quantity || 0}{' '}
          <button className={classes.Tiny__btn} onClick={() => props.increase(props.meal.id)}>
            +
          </button>
        </p>
      </div>
    </div>
  );
  const mealTypes = {
    menu: menuMealsDetails,
    orders: ordersMealsDetails,
    menuMeals: catererMenuMeals,
    mealOptions,
    manageMenu
  };
  const { REACT_APP_ROOT: ROOT } = process.env;
  const imgUrl = `${ROOT}${props.meal.imageUrl}`;
  return (
    <article className={classes.Menu__food__item} role={roles.meal}>
      {props.meal.quantity > 0 && props.type === 'manageMenu' ? (
        <div className="ribbon ribbon-top-left">
          <span>Selected</span>
        </div>
      ) : null}
      <div className={classes.Menu__food__item__img}>
        <img src={imgUrl} alt="Meal" />
      </div>
      {mealTypes[props.type]}
    </article>
  );
};

export default meal;
