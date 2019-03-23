import React from 'react';
import TableHeadItem from './TableHeadItem/TableHeadItem';
const tableHead = props => {
  const headItems = props.rows.map(row => {
    return <TableHeadItem key={row} classes={props.classes} text={row} />;
  });
  return (
    <div className={props.classes.Table__head}>
      <ul className={props.classes.Table__head__list}>
        { headItems }
      </ul>
    </div>
  );
};

export default tableHead;
