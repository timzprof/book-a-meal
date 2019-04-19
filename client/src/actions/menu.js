export const handleQuantity = (store, mealId) => {
  const menus = [...store.menu];
  menus.forEach(menu => {
    const mealIndex = menu.meals.findIndex(meal => meal.id === mealId);
    store.setState({ beingOrdered: menu.meals[mealIndex] });
  });
};

export const hideQuantityModal = (store) => {
  store.setState({ beingOrdered: null });
};
