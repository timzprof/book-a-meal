import api, { setToken, removeToken } from '../api';

export const signUserIn = async (store, { email, password }) => {
  const res = await api.post('/auth/login', {
    email,
    password
  });
  if (res.token) {
    setToken(res.token);
    store.setState({ user: res.user, userAuthenticated: true });
  }
  return res;
};

export const signUserOut = store => {
  removeToken();
  store.setState({ user: {}, userAuthenticated: false });
  window.location.href = '/';
};

export const signUserUp = async (store, { name, email, phone, password }) => {
  const res = await api.post('/auth/signup', {
    name,
    email,
    password,
    phone
  });
  if (res.token) {
    setToken(res.token);
    store.setState({ user: res.user, userAuthenticated: true });
  }
  return res;
};

export const signCatererIn = () => {};

export const signCatererUp = () => {};

export const signCatererOut = () => {};
