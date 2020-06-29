import React from 'react';

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

const formHeadText = ({ user, type }) => (
  <h3>
    <span className="Red">B</span>ook <span className="Red">A</span> Mea
    <span className="Red">l</span> <span>{type === 'register' ? capitalize(user) : ''}</span>{' '}
    <span className="Red">{capitalize(type)}</span>
  </h3>
);

export default React.memo(formHeadText);
