import rootReducer from './modules';
import { composeWithDevTools } from '@redux-devtools/extension';
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import logger from 'redux-logger';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, logger))
);


export default store;