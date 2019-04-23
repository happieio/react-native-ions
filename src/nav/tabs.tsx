// @ts-ignore
import React from 'react';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import { SplashScreen } from '@screen/splash';
//import { IconWithBadge } from '@nav/util/tab-badge';
import { OrderStack } from '@nav/order-stack';
import { ProductStack } from '@nav/product-stack';
import { InventoryStack } from '@nav/Inventory-stack';
import { createAppContainer } from 'react-navigation';


export const TabNavigator = createBottomTabNavigator({
  Product: ProductStack,
  Inventory: InventoryStack,
  Orders: OrderStack
},
  {
    lazy: true,
    initialRouteName: 'Product',
    defaultNavigationOptions: ({ navigation }: any) => ({
      //additional param : horizontal
      tabBarIcon: ({ focused, tintColor }: { focused: boolean, horizontal: boolean, tintColor: string }) => {
        !focused
        navigation.state
        tintColor.toLocaleLowerCase()
        //const { routeName } = navigation.state;
        //let IconComponent = Ionicons;
        // let iconName;
        // if (routeName === 'Home') {
        //   iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        //   // Sometimes we want to add badges to some icons. 
        //   // You can check the implementation below.
        //   //IconComponent = IconWithBadge; 
        // } else if (routeName === 'Settings') {
        //   iconName = `ios-options${focused ? '' : '-outline'}`;
        // }

        // You can return any component that you like here!
        //return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }
  });

export const baseNavStack = createSwitchNavigator({
  Splash: SplashScreen,
  Tabs: TabNavigator
});

export const RootNavigator = createAppContainer(baseNavStack);