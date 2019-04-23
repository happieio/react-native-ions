import { createStackNavigator } from 'react-navigation';
import { ProductListScreen } from '@screen/product-list';
import { ProductDetailScreen } from '@screen/product-detail';


export const ProductStack = createStackNavigator({
  ProductList: ProductListScreen,
  ProductDetail: ProductDetailScreen
});

