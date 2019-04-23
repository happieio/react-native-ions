import { combineReducers } from 'redux';
import { inventory } from '@state/inventory/inventory-reducer';
import { productReducer as product } from '@state/product';
import { order } from '@state/order/order-reducer';
import { authReducer as auth } from '@state/auth';

const appReducer = combineReducers({
  auth,
  inventory,
  order,
  product
});
export const rootReducer = (state: any, action: any) => appReducer(state, action);
