import React from 'react';
import TableFootItem from './TableFootItem/TableFootItem';
const tableFoot = props => {
  const footItems = props.rows.map(row => {
    return <TableFootItem key={row} classes={props.classes} text={row} />;
  });
  return (
    <div className={props.classes.Table__foot}>
      <ul className={props.classes.Table__foot__list}>
        {footItems}
      </ul>
    </div>
  );
};

export default tableFoot;