import { createStore } from 'redux';
import createReducer from './Reducer'

export default createStore(createReducer)