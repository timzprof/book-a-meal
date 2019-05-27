import React from 'react';
import NavListItem from './NavListItem/NavListItem';

const navList = props => {
  const navListHandler = (list, classes) => {
    const keys = Object.keys(list);
    const navItems = keys.map(href => {
      return (
        <NavListItem key={href} content={list[href]} href={href} styles={classes.MNavListItem} />
      );
    });
    return <ul className={classes.MNavList}>{navItems}</ul>;
  };
  const classes = {
    MNavList: props.mobile ? props.classes.MobileNav__list : props.classes.MainNav__list,
    MNavListItem: props.mobile
      ? props.classes.MobileNav__list__item
      : props.classes.MainNav__list__item
  };
  const user = {
    '/': 'Welcome User',
    '/menu': `Today's Menu`,
    '/orders': 'Orders',
    '/order-history': 'Order History',
    '/logout': 'Logout'
  };
  const caterer = {
    '/admin/': `Today's Menu`,
    '/admin/meals': 'Meal Options',
    '/admin/todays-orders': 'Todays Orders',
    '/admin/order-history': 'Order History',
    '/admin/logout': 'Logout'
  };
  const unauth = {
    '/login': 'Login',
    '/register': 'Register',
    '/admin/register': 'Register as a Caterer',
    '/admin/login': 'Login as a Caterer'
  };
  const actualList = props.caterer ? caterer : user;
  const list = !props.authenticated
    ? navListHandler(unauth, classes)
    : navListHandler(actualList, classes);
  return <React.Fragment>{props.mobile && !props.show ? null : list}</React.Fragment>;
};

export default navList;
