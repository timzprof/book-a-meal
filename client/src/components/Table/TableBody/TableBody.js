import React from 'react';
import TableRow from './TableRow/TableRow';

const tableBody = (props) => {
  const orderRows = props.orders.map(order => {
    return <TableRow classes={props.classes} order={order} key={order.id}/>
  });
  return (
    <div>
      { orderRows }
    </div>
  );
}

export default tableBody;