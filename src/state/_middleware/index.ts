import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { rootSaga } from '@state/_middleware/root-saga';

export const sagaMiddleware = createSagaMiddleware();
export const middleware = [sagaMiddleware];
export const sagaRoot = rootSaga;
if (__DEV__) middleware.push(logger);


