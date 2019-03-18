import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Logo.module.css';

const logo = props => {
  const logoClasses = [classes.Logo];
  if (props.mobile) {
    logoClasses.push(classes.MobileLogo);
  }
  return (
    <div className={logoClasses.join(' ')}>
      <Link to="/">
        <span className="Red">B</span>ook <span className="Red">A</span> Mea
        <span className="Red">l</span>
      </Link>
    </div>
  );
};

export default logo;
