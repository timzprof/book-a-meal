import React from 'react';
import classes from './Empty.module.css';
import emptySvg from '../../../assets/img/empty.svg'

const empty = (props) => {
    let msg = 'Empty';
    if(props.menu) msg = 'Empty Menu'
    return (
        <div className={classes.Empty}>
            <img src={emptySvg} alt={msg} />
            <p className={classes.EmptyText}>Empty {props.menu ?  <span className="Red">Menu</span> : null}</p>
        </div>
    );
};

export default empty;