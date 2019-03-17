import React, { Component } from 'react';
import Aux from '../../../hoc/auxiliary';
import NavListItem from './NavListItem/NavListItem';

class NavList extends Component {
  navListHandler(list, classes) {
    const keys = Object.keys(list);
    const navItems = keys.map(href => {
      return <NavListItem key={href} content={list[href]} href={href} styles={classes.MNavListItem} />;
    });
    return <ul className={classes.MNavList}>{navItems}</ul>;
  }

  render() {
    const classes = {
      MNavList: this.props.mobile
        ? this.props.classes.MobileNav__list
        : this.props.classes.MainNav__list,
      MNavListItem: this.props.mobile
        ? this.props.classes.MobileNav__list__item
        : this.props.classes.MainNav__list__item
    };
    const user = {
      '/': 'Welcome User',
      '/menu': 'Today Menu',
      '/orders': 'Orders',
      '/order-history': 'Order History',
      '#': 'Logout'
    };
    const caterer = {
      '/admin': 'Today Menu',
      '/admin/meal-options': 'Meal Options',
      '/admin/todays-orders': 'Todays Orders',
      '/admin/order-history': 'Order History',
      '#': 'Logout'
    };
    const unauth = {
      '/login': 'Login',
      '/register': 'Register',
      '/admin/register': 'Register as a Caterer',
      '/admin/login': 'Login as a Caterer'
    };
    const actualList = this.props.caterer ? caterer : user;
    const list = !this.props.authenticated
      ? this.navListHandler(unauth, classes)
      : this.navListHandler(actualList, classes);
    return <Aux>{this.props.mobile && !this.props.show ? null : list}</Aux>;
  }
}

export default NavList;
