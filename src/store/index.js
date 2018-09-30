import { createStore, compose, applyMiddleware } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';

const initialState = {
  location: null
}

const store = createStore(
    reducers,
    {},
    compose (
      applyMiddleware(thunk)
    )
);

export default store;