import React from 'react';
import isEqual from 'lodash/isEqual';

import classes from './BurgerMenu.module.css';

const BurgerMenu = ({ mobileMenuClass, show, toggle }) => {
  const burgerStyles = [classes.Burger, classes.BurgerSlip, mobileMenuClass];
  if (show) {
    burgerStyles.push(classes.Open);
  }
  return (
    <div className={burgerStyles.join(' ')} onClick={toggle}>
      <div className={classes.BurgerLines}></div>
    </div>
  );
}

export default React.memo(BurgerMenu, isEqual);
