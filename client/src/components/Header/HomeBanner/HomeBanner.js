import React from 'react';
import { Link } from 'react-router-dom';
import isEqual from 'lodash/isEqual';

import classes from './HomeBanner.module.css';

const HomeBanner = ({ isAuthenticated, user }) => {
  const textClasses = [classes.Banner__text, classes.Home__Banner__text].join(' ');
  let menuLink = '/login';
  if (isAuthenticated && user.type === 'user') {
    menuLink = '/menu';
  } else if (isAuthenticated && user.type === 'caterer') {
    menuLink = '/caterer/';
  }
  return (
    <main>
      <section className={classes.Banner}>
        <p className={textClasses}>
          “ We are here to <span className="Red">serve</span> you
        </p>
        <p className={textClasses}>
          Always with the <span className="Red">Quality</span> you deserve ”
        </p>
        <Link to={menuLink} className={['Btn', classes.Banner__button].join(' ')}>
          View Today's Menu
        </Link>
      </section>
    </main>
  );
};

export default React.memo(HomeBanner, isEqual);
