import React from 'react';
import classes from './Logo.module.css';

const logo = props => {
  const logoClasses = [classes.Logo];
  if (props.mobile) {
    logoClasses.push(classes.MobileLogo);
  }
  return (
    <div className={logoClasses.join(' ')}>
      <a href="/">
        <span className="Red">B</span>ook <span className="Red">A</span> Mea
        <span className="Red">l</span>
      </a>
    </div>
  );
};

export default logo;
