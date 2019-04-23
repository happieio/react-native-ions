import { getConfig, postConfig, putConfig, deleteConfig } from '@state/_middleware/endpoint-builder'
import { Base64 } from 'js-base64';
import { NewProduct } from '@interface/common';

const baseUrl = 'https://cscodetest.herokuapp.com/api'
const baseHeaders = { Accept: 'application/json' }

//------ AUTH ENDPOINTS ------//
export const getAuth = (user: string, pass: string) =>
    getConfig(`${baseUrl}/status`, { Authorization: `Basic ${Base64.encode(`${user}:${pass}`)}` }, undefined, true)

//------ PRODUCT ENDPOINTS ------//
export const getPagedProducts = (page: number, limit: number) => getConfig(`${baseUrl}/products`, baseHeaders, { page, limit })
export const getSingleProduct = (id: string) => getConfig(`${baseUrl}/product/${id}`, baseHeaders)
export const getProductStyles = () => getConfig(`${baseUrl}/styles`, baseHeaders)
export const getProductColors = () => getConfig(`${baseUrl}/colors`, baseHeaders)
export const createProduct = (product: NewProduct) => postConfig(`${baseUrl}/product`, product, baseHeaders)
export const updateProduct = (id: string, product: NewProduct) => putConfig(`${baseUrl}/product/${id}`, product, baseHeaders)
export const deleteProduct = (id: string) => deleteConfig(`${baseUrl}/product/${id}`, baseHeaders)

//------ ORDER ENDPOINTS ------//

//------ INVENTORY ENDPOINTS ------//