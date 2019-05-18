import izitoast from 'izitoast';

izitoast.settings({
  timeout: 1500,
  resetOnHover: true,
  position: 'topRight',
  overlay: true,
  overlayClose: true
});

export const toast = (type, message) => {
  const color = {
    success: 'green',
    error: 'red',
    warning: 'yellow',
    info: 'blue'
  };
  izitoast.show({
    color: color[type],
    icon: `ico-${type}`,
    title: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
    message: message,
    onClosing: () => {}
  });
};
