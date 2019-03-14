import React from 'react';
import classes from './HomeBanner.module.css';

const homeBanner = (props) => (
  <main>
    <section className={classes.Banner}>
      <p className={classes.Banner__text}>
        “ We are here to <span className="Red">serve</span> you
      </p>
      <p className={classes.Banner__text}>
        Always with the <span className="Red">Quality</span> you deserve ”
      </p>
      <a href="#menu" className={['Btn', classes.Banner__button].join(' ')}>View Today's Menu</a>
    </section>
  </main>
);

export default homeBanner;