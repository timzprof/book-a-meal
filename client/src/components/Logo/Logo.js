import React from 'react';
import classes from './Logo.module.css';

const logo = (props) => (
  <div className={classes.Logo}>
    <a href="/">
      <span className="Red">B</span>ook <span className="Red">A</span> Mea<span className="Red">l</span>
    </a>
  </div>
);

export default logo;