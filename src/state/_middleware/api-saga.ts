import { call, put, putResolve, takeEvery, select } from 'redux-saga/effects';
import { getAccessToken } from '@state/auth';
import { toJSON } from '@state/_middleware/utils';

export const fetchRequest = ({ url = '/', method = 'GET', headers = {}, excludeJWT, body }: any, accessToken: String) => {
    if (!excludeJWT) headers.Authorization = `Bearer ${accessToken}`;
    const requestConfig: { method: string, headers: any, body?: any } = { method, headers }
    if (body) requestConfig.body = body;
    if (__DEV__) console.warn(url, excludeJWT, requestConfig);
    return fetch(url, requestConfig)
};

//pull in state from passed in selector functions, pass through everything else
function* dataIterator(dataArray: any[]) {
    for (let v of dataArray) {
        if (typeof v === 'function') yield select(v);
        else yield v;
    }
}
function* resolveRequestData(...requestDataArray: any[]) {
    let resolvedArray = [];
    for (let v of dataIterator(requestDataArray)) {
        resolvedArray.push(v);
    }
    yield resolvedArray.flatMap(v => v);
}

export function* apiProcessor(action: any) {
    //build request, pass request function into call
    try {
        if(action.api.networkRequest){
            put({type: 'NETWORK_REQUEST_START', payload:action.api.networkRequest})
        }

        if (typeof action.api.request !== 'function') throw new Error('API Middleware missing action.api.request');
        if (action.api.localAction) yield put(action.api.localAction);

        let resolvedData = [];
        if (action.api.requestData) {
            resolvedData = resolveRequestData(action.api.requestData).next().value;
        }

        const builtRequest = action.api.request(...resolvedData);
        const token = yield select(getAccessToken);
        const networkResponse = yield call(fetchRequest, builtRequest, token)
        const result = yield call(toJSON, networkResponse);
        if (action.api.successActionName) {
            const processedResponse = action.api.successFn ? action.api.successFn(result) : result;
            console.log(processedResponse)
            yield putResolve({ type: action.api.successActionName, payload: processedResponse });
        }
        //return result
    }
    catch (e) {
        if (action.api.failureActionName) {
            const failureResponse = action.api.failureFn ? action.api.failureFn(e) : e;
            yield putResolve({ type: action.api.failureActionName, payload: failureResponse });
        }
        return e
    }
}

export function* apiSaga() {
    yield takeEvery('API_REQUEST', apiProcessor);
}
