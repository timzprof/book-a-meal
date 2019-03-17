import React from 'react';
import classes from './HomeBanner.module.css';

const homeBanner = props => {
  const textClasses = [classes.Banner__text, classes.Home__Banner__text].join(' ');
  return (
    <main>
      <section className={classes.Banner}>
        <p className={textClasses}>
          “ We are here to <span className="Red">serve</span> you
        </p>
        <p className={textClasses}>
          Always with the <span className="Red">Quality</span> you deserve ”
        </p>
        <a href="#menu" className={['Btn', classes.Banner__button].join(' ')}>
          View Today's Menu
        </a>
      </section>
    </main>
  );
};

export default homeBanner;
