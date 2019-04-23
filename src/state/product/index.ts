import { getPagedProducts, getProductStyles, getProductColors, getSingleProduct } from "@state/_middleware/api";
import { Product } from "@interface/common";
import { apiAction } from "@state/_middleware/utils";
import uniqBy from 'lodash/uniqBy'
import { runReducer } from "@state/_util";

//------ ACTIONS ------//
export const getPagedProductsAction = (page = 0, limit = 100) => apiAction(getPagedProducts, [page, limit], 'PAGED_PRODUCTS_RESPONSE')
export const getSingleProductAction = (id: number) => apiAction(getSingleProduct, [id], 'PRODUCT_SINGLE_RESPONSE')
export const getProductStylesAction = () => apiAction(getProductStyles, [], 'PRODUCT_STYLES_RESPONSE')
export const getProductColorsAction = () => apiAction(getProductColors, [], 'PRODUCT_COLORS_RESPONSE')
export const createProductAction = (product: Product, callback: Function) => ({ type: 'PRODUCT_CREATE_SAGA', payload: { product }, callback })
export const updateProductAction = (product: Product, callback: Function) => ({ type: 'PRODUCT_UPDATE_SAGA', payload: { product }, callback })


//------ SELECTORS ------//
export const selectAllProducts = (state: any) => state.product.allProducts
export const selectAllProductsTotal = (state: any) => state.product.total
export const selectProductStyles = (state: any) => state.product.styles
export const selectProductColors = (state: any) => state.product.colors
export const selectNewProductId = (state: any) => state.product.new_product_id
export const selectProductById = (state: any, id: number): Product => {
    const res = state.product.allProducts.filter((v: Product) => v.id === id)
    return res[0] ? res[0] : null //TODO upgrade to maybe monad
}

//------ REDUCER ------//
const initialState = { allProducts: [], total: 0, styles: [], colors: [] }
const cases: any = {}
cases['PAGED_PRODUCTS_RESPONSE'] = (state: any, action: any) => {
    const res = uniqBy([...state.allProducts, ...action.payload.products], 'id')
    return ({ ...state, allProducts: res, total: action.payload.total })
}
cases['PRODUCT_SINGLE_RESPONSE'] = (state: any, action: any) => {
    const res = uniqBy([action.payload.product, ...state.allProducts], 'id')
    return ({ ...state, allProducts: res })
}
cases['PRODUCT_STYLES_RESPONSE'] = (state: any, action: any) => ({
    ...state, styles: action.payload.styles
})
cases['PRODUCT_CREATED_ID_RESPONSE'] = (state: any, action: any) => ({
    ...state, new_product_id: action.payload.product_id
})
cases['PRODUCT_COLORS_RESPONSE'] = (state: any, action: any) => ({
    ...state, colors: action.payload.colors
})
export const productReducer = (state = initialState, action: any) => runReducer(cases, state, action)