import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './root-reducer';


const store = createStore(rootReducer);

const persistor = persistStore(store);

export { store, persistor };