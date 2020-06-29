import React from 'react';
import { Link } from 'react-router-dom';

const NavListItem = (props) => {
  const { styles, href, content } = props;
  return (
    <li className={styles}>
      <Link to={href}>{content}</Link>
    </li>
  );
}

export default React.memo(NavListItem);
