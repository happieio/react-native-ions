import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '@state/root-reducer'
import { middleware, sagaMiddleware, sagaRoot } from '@state/_middleware';

const initialState = {}
export const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));
sagaMiddleware.run(sagaRoot);
