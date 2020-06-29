import React from 'react';
import isEqual from 'lodash/isEqual';

import NavListItem from './NavListItem/NavListItem';

const user = {
  '/': 'Welcome User',
  '/menu': `Today's Menu`,
  '/orders': 'Orders',
  '/order-history': 'Order History',
  '/logout': 'Logout'
};
const caterer = {
  '/caterer': `Today's Menu`,
  '/caterer/meals': 'Meal Options',
  '/caterer/todays-orders': 'Todays Orders',
  '/caterer/order-history': 'Order History',
  '/logout': 'Logout'
};
const unauth = {
  '/login': 'Login',
  '/register': 'Register',
  '/caterer/register': 'Register as a Caterer'
};

const navListHandler = (list, classes) => {
  const keys = Object.keys(list);
  const navItems = keys.map(href => {
    return (
      <NavListItem key={href} content={list[href]} href={href} styles={classes.MNavListItem} />
    );
  });
  return <ul className={classes.MNavList}>{navItems}</ul>;
};

const NavList = ({ mobile, user: loggedInUser, classes, show, authenticated }) => {
  const nClasses = {
    MNavList: mobile ? classes.MobileNav__list : classes.MainNav__list,
    MNavListItem: mobile ? classes.MobileNav__list__item : classes.MainNav__list__item
  };
  const actualList = authenticated && loggedInUser.type === 'caterer' ? caterer : user;
  const list = !authenticated
    ? navListHandler(unauth, nClasses)
    : navListHandler(actualList, nClasses);
  return mobile && !show ? null : list;
};

export default React.memo(NavList, isEqual);
