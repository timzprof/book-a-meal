import React from 'react';
import classes from './Empty.module.css';
import emptySvg from '../../../assets/img/empty.svg'

const empty = (props) => {
    const alt = 'Empty ' + props.text;
    let span = <span className="Red">{props.text}</span>;
    return (
        <div className={classes.Empty}>
            <img src={emptySvg} alt={alt} />
            <p className={classes.EmptyText}>Empty {span}</p>
        </div>
    );
};

export default empty;