import URI from 'urijs';

const buildHeaders = (headers: any) => ({
    'Content-Type': 'application/json',
    ...headers
})

const safeString = (data: any) => {
    try {
        return JSON.stringify(data)
    }
    catch (e) {
        throw Error('could not safe string data: ' + e.message)
    }
}

const urlBuilder = (url: string, params: any) => {
    const uri = new URI(url)
    Object.keys(params).forEach(key => uri.addQuery(key, params[key]))
    return uri.valueOf()
}

export const getConfig = (endpoint: string, headers = {}, params = {}, excludeJWT: boolean = false) => ({
    url: urlBuilder(endpoint, params),
    method: 'GET',
    headers: buildHeaders(headers),
    params,
    excludeJWT
});

export const postConfig = (endpoint: string, payload: any, headers = {}, params = {}, excludeJWT: boolean = false) => ({
    url: urlBuilder(endpoint, params),
    method: 'POST',
    headers: buildHeaders(headers),
    body: safeString(payload),
    excludeJWT
});

export const putConfig = (endpoint: any, payload: any, headers = {}, params = {}, excludeJWT: boolean = false) => ({
    url: urlBuilder(endpoint, params),
    method: 'PUT',
    headers: buildHeaders({ ...headers, Accept: 'application/json' }),
    body: safeString(payload),
    excludeJWT
});

export const deleteConfig = (endpoint: any, payload: any, headers = {}, params = {}, excludeJWT: boolean = false) => ({
    url: urlBuilder(endpoint, params),
    method: 'DELETE',
    headers: buildHeaders(headers),
    body: safeString(payload),
    excludeJWT
});