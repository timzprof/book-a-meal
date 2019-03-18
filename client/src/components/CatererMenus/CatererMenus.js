import React from 'react';
import CatererMenu from './CatererMenu/CatererMenu';

const catererMenus = props => {
  const catererMenus = [...props.catererData];
  const menus = catererMenus.map(catererMenu => {
    return (
      <CatererMenu key={catererMenu.catering_service} meals={catererMenu.meals} catering_service={catererMenu.catering_service} />
    );
  });
  return menus;
};

export default catererMenus;
