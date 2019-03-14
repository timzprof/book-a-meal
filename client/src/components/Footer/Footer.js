import React from 'react';
import classes from './Footer.module.css';

const footer = (props) => (
  <footer className={classes.Footer}>
    <p>&copy; 2019 Copyright. <span className="red">Book A Meal</span>.</p>
  </footer>
);

export default footer;