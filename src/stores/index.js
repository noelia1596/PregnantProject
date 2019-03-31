import {createStore, applyMiddleware} from 'redux';
import Thunk from 'redux-thunk';

import reducers from '../reducers'

export default createStore(reducers, {}, applyMiddleware(Thunk));
