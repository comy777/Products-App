import 'react-native-gesture-handler';
import React from 'react';
import AppRoutes from './src/routes/AppRoutes';
import AuthContextProvider from './src/context/AuthContext';
import ProductsProvider from './src/context/ProductContext';

const AppState = ({children}: any) => {
  return (
    <ProductsProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </ProductsProvider>
  );
};

const App = () => {
  return (
    <AppState>
      <AppRoutes />
    </AppState>
  );
};

export default App;
