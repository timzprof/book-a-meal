import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './reducer/auth';
import menuReducer from './reducer/menu';
import ordersReducer from './reducer/orders';
import mealReducer from './reducer/meal';

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })
    : null || compose;

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  blacklist: ['loading', 'error', 'errorMessage']
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  menu: menuReducer,
  orders: ordersReducer,
  meal: mealReducer
});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)));

export const persistor = persistStore(store);
