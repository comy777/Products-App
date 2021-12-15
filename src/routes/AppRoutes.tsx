import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScren from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ProtecterScreen from '../screens/auth/ProtecterScreen';
import {AuthContext} from '../context/AuthContext';
import LoadingScreen from '../screens/auth/LoadingScreen';
import ProductRoute from './ProductRoute';

const Stack = createStackNavigator();

const AppRoutes = () => {
  const {status} = useContext(AuthContext);
  if (status === 'checking') return <LoadingScreen />;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: 'white',
          },
        }}>
        {status !== 'authenticated' ? (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScren} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="ProductsRoute" component={ProductRoute} />
            <Stack.Screen name="ProtecterScreen" component={ProtecterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
