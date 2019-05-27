import React from 'react';
import classes from './Loading.module.css';

const loading = () => (
    <div className={classes.fullscreen}>
        <div className={classes.Loader}>Loading...</div>
    </div>
);

export default loading;