import {compose, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import reducer from './reducers';
import thunk from 'redux-thunk';
const middleware = [
    logger,
    thunk
]
const enhancers = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducer,enhancers);

export { store };