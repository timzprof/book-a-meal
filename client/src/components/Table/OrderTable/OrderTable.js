import React from 'react';
import classes from '../Table.module.css';
import TableHead from '../TableHead/TableHead';
import TableBody from '../TableBody/TableBody';

const orderTable = props => {
  const headItems = ['#ID', 'Caterer', 'Order Summary', 'Order Date', 'Order Total'];
  if (props.caterer) headItems[1] = 'Customer Name';
  return (
    <section className={['page-section', classes.Table].join(' ')}>
      <TableHead classes={classes} rows={headItems} />
      <TableBody classes={classes} orders={props.orders} />
    </section>
  );
};

export default orderTable;
