import React from 'react';

const tableRow = (props) => {
  const meals = props.order.meals.map(meal => {
    return (
      <React.Fragment key={meal.id}>
        <li className={props.classes.Order__summary__list__item}>
          <p>{meal.name}</p>
          <span className={props.classes.Dash}>-</span>
          <p>{meal.quantity}</p>
        </li>
      </React.Fragment>
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
        <li className={props.classes.Table__row__list__item}>${props.order.total.toFixed(2)}</li>
      </ul>
    </div>
  );  
}

export default tableRow;