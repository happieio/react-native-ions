
const initialState = {}

const cases: any = {}
cases['TEST'] = (state: any, action: any) => ({ ...state, action })

export const order = (state = initialState, action: any) => {
    return typeof cases[action.type] === 'function' ? cases[action.type](state, action) : state;
}