import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import MealList from '../../../components/MealList/MealList';
import Loading from '../../../components/UI/Loading/Loading';

import { menuFetchSingleMenu } from '../../../redux/action';

class CatererHome extends PureComponent {
  componentDidMount() {
    this.props.onFetchCatererMenu();
  }

  render() {
    const { loading, menuMeals } = this.props;
    return (
      <>
        <Header bannerText="Your Menu for Today" />
        <main>{loading ? <Loading /> : <MealList type="menuMeals" meals={menuMeals} />}</main>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.menu.loading,
    menuMeals: state.menu.catererMenu.map(JSON.parse)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCatererMenu: () => dispatch(menuFetchSingleMenu())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CatererHome);
