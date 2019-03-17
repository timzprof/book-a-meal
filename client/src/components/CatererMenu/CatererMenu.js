import React, { Component } from 'react';
import classes from './CatererMenu.module.css';

class CatererMenu extends Component {
  state = {
    catererData: {
      'Book A Meal Caterer': [
        { 
          id: 1,
          name: 'Jollof Rice',
          price: 500,
          image: 'https://book-a-meal-rest-api.herokuapp.com/images/meal1.jpg'
        },
        {
          id: 2,
          name: 'Veggie Salad',
          price: 500,
          image: 'https://book-a-meal-rest-api.herokuapp.com/images/meal3.jpg'
        }
      ]
    }
  }

  render() {
    return (
      <main>
        <section className={['page-section', classes.Menu].join(' ')}>
          <div className={classes.Menu__label} />
        </section>
      </main>
    );
  }
}

export default CatererMenu;
