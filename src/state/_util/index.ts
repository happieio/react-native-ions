export const runReducer = (cases: any, state: any, action: any) => {
    return typeof cases[action.type] === 'function' ? cases[action.type](state, action) : state;
}