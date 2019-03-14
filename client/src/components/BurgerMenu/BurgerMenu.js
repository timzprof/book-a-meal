import React from 'react';
import classes from './BurgerMenu.module.css';

const burgerMenu = (props) => (
  <div className={[classes.Burger, classes.BurgerSlip, classes.MobileMenu].join(' ')}>
    <div className={classes.BurgerLines} onClick={props.toggle}></div>
  </div>
);

export default burgerMenu;