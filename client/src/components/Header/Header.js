import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Header.module.css';
import Logo from '../Logo/Logo';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import NavList from '../Header/NavList/NavList';
import Overlay from '../UI/Overlay/Overlay';
import HomeBanner from './HomeBanner/HomeBanner';
import Banner from './Banner/Banner';

class Header extends Component {
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
    const extraStyles = this.props.homepage ? classes.HomeHeader : '';
    const auth = this.props.caterer
      ? this.props.catererAuthenticated
      : this.props.userAuthenticated;
    return (
      <React.Fragment>
        <Overlay show={this.state.mobileToggle || this.props.overlay} />
        <header className={[classes.Header, extraStyles].join(' ')}>
          <nav className={classes.MainNav}>
            <Logo />
            <NavList caterer={this.props.caterer} classes={classes} authenticated={auth} />
            <BurgerMenu
              show={this.state.mobileToggle}
              mobileMenuClass={classes.MobileMenu}
              toggle={this.toggleMobileMenu}
            />
          </nav>
          <nav className={[classes.MobileNav, show].join(' ')}>
            <Logo mobile />
            <NavList
              caterer={this.props.caterer}
              mobile
              classes={classes}
              authenticated={auth}
              show={this.state.mobileToggle}
            />
          </nav>
          {this.props.homepage ? (
            <HomeBanner
              userAuthenticated={this.props.userAuthenticated}
              catererAuthenticated={this.props.catererAuthenticated}
            />
          ) : (
            <Banner text={this.props.bannerText} />
          )}
        </header>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userAuthenticated: state.auth.userAuthenticated,
    catererAuthenticated: state.auth.catererAuthenticated
  };
};

export default connect(mapStateToProps)(Header);
