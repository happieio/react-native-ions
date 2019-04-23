//@ts-ignore
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { InventoryListScreen } from '@screen/inventory-list';
import { InventoryDetailScreen } from '@screen/inventory-detail';





export const InventoryStack = createStackNavigator({
  InventoryList: InventoryListScreen,
  InventoryDetail: InventoryDetailScreen
});
