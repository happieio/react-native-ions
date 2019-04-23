export const toJSON = (apiResponse: any) => {
    try { return apiResponse.json() }
    catch (e) {
        try { return JSON.parse(apiResponse) }
        catch (e) { return apiResponse; }
    }
}

export const apiAction = (request: Function, requestData: any[], successActionName?: string) => ({
    type: 'API_REQUEST',
    api: { request, requestData, successActionName }
})