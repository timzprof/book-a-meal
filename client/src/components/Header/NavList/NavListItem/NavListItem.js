import React from 'react';
import { Link } from 'react-router-dom';

const navListItem = (props) => {
  return (
    <li className={props.styles}>
      <Link to={props.href}>{props.content}</Link>
    </li>
  );
}

export default navListItem;