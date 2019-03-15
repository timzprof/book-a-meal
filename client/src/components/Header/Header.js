import React, { Component } from 'react';
import Aux from '../../hoc/auxiliary';
import Logo from '../Logo/Logo';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import NavList from '../Header/NavList/NavList';
import Overlay from '../UI/Overlay/Overlay';
import classes from './Header.module.css';

class Header extends Component {
  state = {
    mobileToggle: false
  }

  toggleMobileMenu = () => {
    this.setState((prevState, props) => {
      return {
        mobileToggle: !prevState.mobileToggle
      }
    });
  }
  render() {
    const show = this.state.mobileToggle ? '' : 'Hide'; 
    const extraStyles = this.props.page === 'Home' ? classes.HomeHeader : '';
    return (
      <Aux>
        <Overlay show={this.state.mobileToggle} />
        <header className={[classes.Header, extraStyles].join(' ')}>
          <nav className={classes.MainNav}>
            <Logo />
            <NavList
              mobile={false}
              classes={classes} />
            <BurgerMenu
              show={this.state.mobileToggle}
              mobileMenuClass={classes.MobileMenu}
              toggle={this.toggleMobileMenu} />
          </nav>
          <nav className={[classes.MobileNav, show].join(' ')}>
            <Logo mobile={true} />
            <NavList
              mobile={true}
              classes={classes}
              show={this.state.mobileToggle} />
          </nav>
        </header>
      </Aux>
    );
  }
}

export default Header;