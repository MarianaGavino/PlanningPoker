import { combineReducers, applyMiddleware } from 'redux'                         //mùltiples reducers
import { persistReducer } from 'redux-persist';                   //almacenar los reducers
import storage from 'redux-persist/lib/storage';                //almacenar los valores de manera local
import thunk from 'redux-thunk';      
import cardsDeckReducer from './components/Reducer/reducer';                          // Conectar redux persist con toolkit
import { legacy_createStore as createStore } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

const persistConfig = {
    key: 'root',
    storage,
  }

  const reducers = combineReducers ({
  cardsDeckReducer: cardsDeckReducer,
})
export type RootState = ReturnType<typeof reducers>;

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer,composeWithDevTools(applyMiddleware(thunk)));
export type AppDispatch = typeof store.dispatch;

export default store;