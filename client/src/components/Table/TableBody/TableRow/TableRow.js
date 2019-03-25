import React from 'react';
import Aux from '../../../../hoc/auxiliary';

const tableRow = (props) => {
  const meals = props.order.meals.map(meal => {
    return (
      <Aux key={meal.id}>
        <li className={props.classes.Order__summary__list__item}>
          <p>{meal.name}</p>
          <span className={props.classes.Dash}>-</span>
          <p>{meal.quantity}</p>
        </li>
      </Aux>
    );
  });
  return (
    <div className={props.classes.Table__row}>
      <ul className={props.classes.Table__row__list}>
        <li className={props.classes.Table__row__list__item}>{props.order.id}</li>
        <li className={props.classes.Table__row__list__item}>{props.order.user || props.order.caterer}</li>
        <li className={props.classes.Table__row__list__item}>
          <ul className={props.classes.Order__summary__list}>
            { meals }
          </ul>
        </li>
        <li className={props.classes.Table__row__list__item}>{props.order.date}</li>
        <li className={props.classes.Table__row__list__item}>${props.order.price.toFixed(2)}</li>
      </ul>
    </div>
  );  
}

export default tableRow;