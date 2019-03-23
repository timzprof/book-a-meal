import React, { Component } from 'react';
import classes from './Header.module.css';
import Aux from '../../hoc/auxiliary';
import Logo from '../Logo/Logo';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import NavList from '../Header/NavList/NavList';
import Overlay from '../UI/Overlay/Overlay';
import HomeBanner from './HomeBanner/HomeBanner';
import Banner from './Banner/Banner';

class Header extends Component {
  state = {
    mobileToggle: false,
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
    const extraStyles = this.props.homepage ? classes.HomeHeader : '';
    return (
      <Aux>
        <Overlay show={this.state.mobileToggle || this.props.overlay} />
        <header className={[classes.Header, extraStyles].join(' ')}>
          <nav className={classes.MainNav}>
            <Logo />
            <NavList
              caterer={this.props.caterer}
              classes={classes}
              authenticated={this.props.authenticated} />
            <BurgerMenu
              show={this.state.mobileToggle}
              mobileMenuClass={classes.MobileMenu}
              toggle={this.toggleMobileMenu} />
          </nav>
          <nav className={[classes.MobileNav, show].join(' ')}>
            <Logo mobile />
            <NavList
              caterer={this.props.caterer}
              mobile
              classes={classes}
              authenticated={this.props.authenticated}
              show={this.state.mobileToggle} />
          </nav>
          { this.props.homepage ? <HomeBanner /> : <Banner text={this.props.bannerText} /> }
        </header>
      </Aux>
    );
  }
}

export default Header;