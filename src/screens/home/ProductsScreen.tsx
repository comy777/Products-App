import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {ProductContext} from '../../context/ProductContext';
import {StackScreenProps} from '@react-navigation/stack';
import {ProductStackParams} from '../../routes/ProductRoute';

interface Props
  extends StackScreenProps<ProductStackParams, 'ProductsScreen'> {}

const ProductsScreen = ({navigation}: Props) => {
  const {products, loadProducts} = useContext(ProductContext);
  const [refreshing, setIsrefreshing] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{marginRight: 10}}
          onPress={() => navigation.navigate('ProductScreen', {})}>
          <Text>Agregar</Text>
        </TouchableOpacity>
      ),
    });
  }, []);
  const loadProductsFromBackend = async () => {
    setIsrefreshing(true);
    await loadProducts();
    setIsrefreshing(false);
  };
  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <FlatList
        data={products}
        keyExtractor={p => p._id}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('ProductScreen', {
                id: item._id,
                name: item.nombre,
              })
            }>
            <Text style={styles.productName}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => (
          <View style={styles.itemSeparator}></View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadProductsFromBackend}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productName: {
    fontSize: 20,
  },
  itemSeparator: {
    borderBottomWidth: 5,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    marginVertical: 5,
  },
});

export default ProductsScreen;
