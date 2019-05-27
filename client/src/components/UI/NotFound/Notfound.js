import React from 'react';
import classes from './NotFound.module.css';
import notFoundSvg from '../../../assets/img/not_found.svg'

const notFound = () => (
    <div className={classes.NotFound}>
        <img src={notFoundSvg} alt="Page Not Found Banner"/>
    </div>
);

export default notFound;