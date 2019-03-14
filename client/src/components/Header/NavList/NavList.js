import React from 'react';
import Aux from '../../../hoc/auxiliary';

const navList = props => {
  const classes = {
    MNavList: props.mobile ? props.classes.MobileNav__list : props.classes.MainNav__list,
    MNavListItem: props.mobile ? props.classes.MobileNav__list__item : props.classes.MainNav__list__item
  };
  return (
    <Aux>
    { props.mobile && !props.show 
      ?  null
      : (
        <ul className={classes.MNavList}>
          <li className={classes.MNavListItem}>
            <a href="login.html">Login</a>
          </li>
          <li className={classes.MNavListItem}>
            <a href="register.html">Register</a>
          </li>
          <li className={classes.MNavListItem}>
            <a href="admin/login.html">Register as a Caterer</a>
          </li>
          <li className={classes.MNavListItem}>
            <a href="admin/register.html">Login as a Caterer</a>
          </li>
        </ul>
      )
    }
    </Aux>
  );
};

export default navList;
