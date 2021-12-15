import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductScreen from '../screens/home/ProductScreen';
import ProductsScreen from '../screens/home/ProductsScreen';

export type ProductStackParams = {
  ProductsScreen: undefined;
  ProductScreen: {id?: string; name?: string};
};

const Stack = createStackNavigator<ProductStackParams>();

const ProductRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        },
      }}>
      <Stack.Screen
        name="ProductsScreen"
        component={ProductsScreen}
        options={{
          title: 'Productos',
        }}
      />
      <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{
          title: 'Producto',
        }}
      />
    </Stack.Navigator>
  );
};

export default ProductRoute;
