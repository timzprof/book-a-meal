import 'unfetch/polyfill';

const TOKEN_STRING = 'token';

const { REACT_APP_API_URL: API_URL } = process.env;

console.log(process.env);

const toJSON = res => res.json();
const token = () => localStorage.getItem(TOKEN_STRING) || '';

const requestOptions = (method, body, options) => {
  const tokenString = token();
  let headers = { 'Content-Type': 'application/json' };
  if (tokenString) {
    headers = { ...headers, Authorization: `Bearer ${tokenString}` };
  }
  console.log(method);
  return {
    method, ...options, headers, body: JSON.stringify(body),
  };
};

export default {
  get: url => fetch(API_URL + url, requestOptions('GET')).then(toJSON),
  post: (url, body) => fetch(API_URL + url, requestOptions('POST', body)).then(toJSON),
  patch: (url, body) => fetch(API_URL + url, requestOptions('PATCH', body)).then(toJSON),
  put: (url, body) => fetch(API_URL + url, requestOptions('PUT', body)).then(toJSON),
  delete: (url, body) => fetch(API_URL + url, requestOptions('DELETE', body)).then(toJSON),
  request: (request, requestOpt) => fetch(request, requestOpt).then(toJSON),
};

export const setToken = (t) => {
  localStorage.setItem(TOKEN_STRING, t);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_STRING);
};