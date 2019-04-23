//@ts-ignore
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { OrderListScreen } from '@screen/order-list';
import { OrderDetailScreen } from '@screen/order-detail';

export const OrderStack = createStackNavigator({
  OrderList: OrderListScreen,
  OrderDetail: OrderDetailScreen
});