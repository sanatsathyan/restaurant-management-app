import {combineReducers, createStore} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import {UserReducer} from './user/reducer';
import {MenuReducer} from './menu/reducer';
import {OrderReducer} from './orders/reducer';
import {SettingsReducer} from './settings/reducer';

const initialState = {};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  //whitelist: ['bookmarks']
};

export type ReducerType = {
  user: any;
  menu: any;
  orders: any;
  settings: any;
};

const rootReducer = combineReducers<ReducerType>({
  user: persistReducer(persistConfig, UserReducer),
  menu: persistReducer(persistConfig, MenuReducer),
  orders: persistReducer(persistConfig, OrderReducer),
  settings: persistReducer(persistConfig, SettingsReducer),
});

export const store = createStore(rootReducer, initialState);

export const persistor = persistStore(store);
