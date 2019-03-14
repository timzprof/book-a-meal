import React, { Component } from 'react';
import Logo from '../Logo/Logo';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import NavList from '../Header/NavList/NavList';
import classes from './Header.module.css';

class Header extends Component {
  state = {
    mobileToggle: false
  }

  toggleMobileMenu = () => {
    
  }
  render() {
    const extraStyles = this.props.page === 'Home' ? classes.HomeHeader : '';
    return (
      <header className={[classes.Header, extraStyles].join(' ')}>
        <nav className={classes.MainNav}>
          <Logo />
          <NavList 
            mobile={false} 
            classes={classes} />
          <BurgerMenu 
            toggle={this.toggleMobileMenu} />
        </nav>
        <nav className={[classes.MobileNav, 'Hide'].join(' ')}>
          <Logo />
          <NavList 
            mobile={true} 
            classes={classes} 
            show={this.state.mobileToggle} />
        </nav>
      </header>
    );
  }
}

export default Header;