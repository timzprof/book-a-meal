import React from 'react';
import classes from './Empty.module.css';
import emptySvg from '../../../assets/img/empty.svg'

const empty = (props) => {
    let alt = 'Empty';
    let span = null;
    if(props.menu){
        alt = 'Empty Menu';
        span = <span className="Red">Menu</span>;
    } 
    if(props.orders){
        alt = 'Empty Orders';
        span = <span className="Red">Orders</span>;
    }
    return (
        <div className={classes.Empty}>
            <img src={emptySvg} alt={alt} />
            <p className={classes.EmptyText}>Empty {span}</p>
        </div>
    );
};

export default empty;