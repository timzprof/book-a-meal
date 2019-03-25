import React from 'react';

const tableFootItem = props => {
  let li = <li className={props.classes.Table__foot__list__item}>{props.text}</li>;
  if (typeof props.text === 'object') {
    li = <li className={props.classes.Table__foot__list__item}>${props.text.total.toFixed(2)}</li>;
  }
  return li;
};

export default tableFootItem;
