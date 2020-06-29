import React from 'react';
import classes from './Banner.module.css';

const Banner = (props) => (
  <section className={classes.Banner}>
    <p className={classes.Banner__text}>{props.text}</p>
  </section>
);

export default Banner;
