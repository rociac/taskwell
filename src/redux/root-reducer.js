import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


import userReducer from './user/user.reducer';
import collectionsReducer from './collections/collections.reducer';
import titleReducer from './title/title.reducer';
import authReducer from './auth/auth.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['collections', 'user']
}


const rootReducer = combineReducers({
  user: userReducer,
  collections: collectionsReducer,
  title: titleReducer,
  isLoggedIn: authReducer,
});

export default persistReducer(persistConfig, rootReducer);

