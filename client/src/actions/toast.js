import izitoast from 'izitoast';

izitoast.settings({
  timeout: 2000,
  resetOnHover: true,
  position: 'center'
});

export const success = (message, redirect) => {
  izitoast.show({
    color: 'green',
    icon: 'ico-success',
    title: 'Success',
    message: message,
    onClosing: () => {}
  });
};

export const warning = (message, redirect) => {
  izitoast.show({
    color: 'yellow',
    icon: 'ico-warning',
    title: 'Warning',
    message: message,
    onClosing: () => {}
  });
};

export const error = message => {
  izitoast.show({
    color: 'red',
    icon: 'ico-error',
    title: 'Error',
    message: message,
    onClosing: () => {}
  });
};
