import React from 'react';
import useGlobalHook from 'use-global-hook';

import * as actions from '../actions';

const initialState = {
  userAuthenticated: false,
  catererAuthenticated: false,
  overlay: false,
  menu: [
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
          imageUrl:
            'https://thumbs.dreamstime.com/b/plate-ewa-agoyin-agege-bread-nigerian-staple-meal-consisting-baked-beans-red-palm-oil-stew-sauce-90622030.jpg',
          quantity: 5
        }
      ],
      catering_service: 'Book A Meal Caterer'
    }
  ],
  beingOrdered: null
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
