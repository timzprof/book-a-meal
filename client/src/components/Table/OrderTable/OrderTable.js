import React from 'react';
import classes from '../Table.module.css';
import TableHead from '../TableHead/TableHead';
import TableBody from '../TableBody/TableBody';
import TableFoot from '../TableFoot/TableFoot';

const orderTable = props => {
  const headItems = ['#ID', 'Caterer', 'Order Summary', 'Order Date', 'Order Total'];
  const total = props.orders.reduce((acc, order) => {
    return acc + order.total;
  },0);
  const footItems = ['Total', {total}];
  if(props.todaysOrders) headItems.splice(3,1);
  if (props.caterer) headItems[1] = 'Customer Name';
  return (
    <section className={['page-section', classes.Table].join(' ')}>
      <TableHead classes={classes} rows={headItems} />
      <TableBody classes={classes} orders={props.orders} />
      {props.todaysOrders ? <TableFoot classes={classes} rows={footItems} />: null }
    </section>
  );
};

export default orderTable;
