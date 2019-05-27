import React from 'react';

const modalTitle = props => {
  const classes = props.classes;
  return (
    <h3 className={classes.Modal__title}>
      <span className="Red">B</span>ook <span className="Red">A</span> Mea<span className="Red">l</span> {props.title}
    </h3>
  );
};

export default modalTitle;
