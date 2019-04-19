import React, { useState } from 'react';
import classes from './Header.module.css';
import Aux from '../../hoc/auxiliary';
import Logo from '../Logo/Logo';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import NavList from '../Header/NavList/NavList';
import Overlay from '../UI/Overlay/Overlay';
import HomeBanner from './HomeBanner/HomeBanner';
import Banner from './Banner/Banner';

const header = props => {
  const [state, setState] = useState({ mobileToggle: false });

  const toggleMobileMenu = () => {
    setState((prevState, props) => {
      return {
        mobileToggle: !prevState.mobileToggle
      };
    });
  };
  const show = state.mobileToggle ? '' : 'Hide';
  const extraStyles = props.homepage ? classes.HomeHeader : '';
  return (
    <Aux>
      <Overlay show={state.mobileToggle || props.overlay} />
      <header className={[classes.Header, extraStyles].join(' ')}>
        <nav className={classes.MainNav}>
          <Logo />
          <NavList
            caterer={props.caterer}
            classes={classes}
            authenticated={props.authenticated}
          />
          <BurgerMenu
            show={state.mobileToggle}
            mobileMenuClass={classes.MobileMenu}
            toggle={toggleMobileMenu}
          />
        </nav>
        <nav className={[classes.MobileNav, show].join(' ')}>
          <Logo mobile />
          <NavList
            caterer={props.caterer}
            mobile
            classes={classes}
            authenticated={props.authenticated}
            show={state.mobileToggle}
          />
        </nav>
        {props.homepage ? <HomeBanner /> : <Banner text={props.bannerText} />}
      </header>
    </Aux>
  );
};

export default header;
