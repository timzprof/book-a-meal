import izitoast from 'izitoast';

izitoast.settings({
  timeout: 1500,
  resetOnHover: true,
  position: 'center'
});

export const toast = (store,type, message) => {
  let color = type === 'success' ? 'green' : 'red';
  if (type === 'warning') color = 'yellow';
  if (type === 'info') color = 'blue';
  store.setState({ overlay: true });
  izitoast.show({
    color,
    icon: `ico-${type}`,
    title: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
    message: message,
    onClosing: () => {
        store.setState({ overlay: false });
    }
  });
};
