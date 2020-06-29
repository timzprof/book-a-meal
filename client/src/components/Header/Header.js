import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import classes from './Header.module.css';
import Logo from '../Logo/Logo';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import NavList from '../Header/NavList/NavList';
import Overlay from '../UI/Overlay/Overlay';
import HomeBanner from './HomeBanner/HomeBanner';
import Banner from './Banner/Banner';

class Header extends PureComponent {
  state = {
    mobileToggle: false
  };
  toggleMobileMenu = () => {
    this.setState(prevState => {
      return {
        mobileToggle: !prevState.mobileToggle
      };
    });
  };
  render() {
    const show = this.state.mobileToggle ? '' : 'Hide';
    const { homepage, bannerText, user, isAuthenticated } = this.props;
    const extraStyles = homepage ? classes.HomeHeader : '';
    return (
      <>
        <Overlay show={this.state.mobileToggle || this.props.overlay} />
        <header className={[classes.Header, extraStyles].join(' ')}>
          <nav className={classes.MainNav}>
            <Logo />
            <NavList
              user={user}
              classes={classes}
              authenticated={isAuthenticated}
            />
            <BurgerMenu
              show={this.state.mobileToggle}
              mobileMenuClass={classes.MobileMenu}
              toggle={this.toggleMobileMenu}
            />
          </nav>
          <nav className={[classes.MobileNav, show].join(' ')}>
            <Logo mobile />
            <NavList
              user={user}
              mobile
              classes={classes}
              authenticated={isAuthenticated}
              show={this.state.mobileToggle}
            />
          </nav>
          {homepage ? (
            <HomeBanner
              isAuthenticated={isAuthenticated}
              user={user}
            />
          ) : (
            <Banner text={bannerText} />
          )}
        </header>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Header);
