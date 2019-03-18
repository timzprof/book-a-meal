import React, { Component } from 'react';
import Aux from '../../hoc/auxiliary';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CatererMenus from '../../components/CatererMenus/CatererMenus';

class Menu extends Component {
  state = {
    catererData: [
      {
        meals: [
          {
            id: 1,
            name: 'Jollof Rice',
            price: 500,
            imageUrl: 'http://foodhub.ng/wp-content/uploads/2018/12/jollof-rice-cooking.jpg',
            quantity: 5
          },
          {
            id: 2,
            name: 'Bread & Beans',
            price: 500,
            imageUrl: 'https://thumbs.dreamstime.com/b/plate-ewa-agoyin-agege-bread-nigerian-staple-meal-consisting-baked-beans-red-palm-oil-stew-sauce-90622030.jpg',
            quantity: 5
          }
        ],
        catering_service: 'Book A Meal Caterer'
      }
    ]
  };

  render() {
    return (
      <Aux>
        <Header bannerText="Today's Menus" authenticated />
        <main>
          <CatererMenus catererData={this.state.catererData} />
        </main>
        <Footer />
      </Aux>
    );
  }
}

export default Menu;
