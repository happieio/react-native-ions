import { getAuth } from "@state/_middleware/api";
import { apiAction } from "@state/_middleware/utils";
import { navigate } from "@nav/util/nav-service";
import { runReducer } from "@state/_util";

//------ ACTIONS ------//
export const getAuthAction = (user: string, pass: string) => apiAction(getAuth, [user, pass], 'AUTH_RESPONSE')
export const setJWTAction = (jwt: string) => ({ type: 'SET_JWT', payload: jwt });

//------ SELECTORS ------//
export const getAccessToken = (state: any) => state.auth.token
export const getAuthError = (state: any) => state.auth.error

//------ REDCUERS ------//
const initialState = { token: null, error: null }

const cases: any = {}
cases['AUTH_RESPONSE'] = (state: any, action: any) => {
    if (action.payload.error === 0) navigate('ProductList')
    return { ...state, token: action.payload.token, error: action.payload.error }
}
cases['SET_JWT'] = (state: any, action: any) => {
    navigate('ProductList')
    return ({ ...state, token: action.payload })
}
export const authReducer = (state = initialState, action: any) => runReducer(cases, state, action)