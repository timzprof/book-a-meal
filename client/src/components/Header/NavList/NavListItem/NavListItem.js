import React from 'react';

const navListItem = (props) => {
  return (
    <li className={props.styles}>
      <a href={props.href}>{props.content}r</a>
    </li>
  );
}

export default navListItem;