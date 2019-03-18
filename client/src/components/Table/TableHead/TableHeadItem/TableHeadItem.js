import React from 'react';

const tableHeadItem = (props) => {
  return (
    <li className={props.classes.Table__head__list__item}>{props.text}</li>
  );
}

export default tableHeadItem;