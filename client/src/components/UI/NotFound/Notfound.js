import React from 'react';
import classes from './NotFound.module.css';
import svg from '../../../assets/img/not_found.svg'

const notFound = () => (
    <div className={classes.notFound}>
        <img src={svg} alt="Page Not Found Banner"/>
    </div>
);

export default notFound;