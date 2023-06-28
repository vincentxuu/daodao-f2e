import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer from '../reducers';
import rootSaga from '../sagas';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';



// create a makeStore function
const storeFactory = (preloadedState) => {
  const persistConfig = {
    key: 'root',
    storage,
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  const enableLog =
    process.env.NODE_ENV !== 'production' && process.env.NO_LOG !== 'TRUE';
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = enableLog ? [logger, sagaMiddleware] : [sagaMiddleware];
  const store = configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: [...middlewares],
  });
  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);

  return store;
};


export default storeFactory;
