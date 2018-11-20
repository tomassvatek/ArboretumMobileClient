import { createStore, compose, applyMiddleware } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';

const initialState = {
}

const store = createStore(
    reducers,
    initialState,
    compose (
      applyMiddleware(thunk)
    )
);

export default store;