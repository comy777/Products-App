import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Image,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {StackScreenProps} from '@react-navigation/stack';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ProductStackParams} from '../../routes/ProductRoute';
import useCategories from '../../hooks/useCategories';
import LoadingScreen from '../auth/LoadingScreen';
import useForm from '../../hooks/useForm';
import {ProductContext} from '../../context/ProductContext';

interface Props extends StackScreenProps<ProductStackParams, 'ProductScreen'> {}

const ProductScreen = ({navigation, route}: Props) => {
  const {id = '', name = ''} = route.params;
  const [tempUri, setTempUri] = useState<string>();
  const {isLoading, categories} = useCategories();
  const {loadProductId, addProduct, updateProduct, uploadImage} =
    useContext(ProductContext);
  const {form, onChange, setFormValue} = useForm({
    _id: id,
    categoriaId: '',
    nombre: name,
    img: '',
  });
  const {_id, nombre, categoriaId, img} = form;
  useEffect(() => {
    navigation.setOptions({
      title: nombre ? nombre : 'Sin nombre de producto',
    });
  }, [nombre]);
  const safeOrUpdate = async () => {
    if (id.length > 0) {
      updateProduct(categoriaId, nombre, id);
    } else {
      if (categoriaId.length === 0) {
        onChange(categories[0]._id, 'categoriaId');
      }
      const temp = categoriaId || categories[0]._id;
      const newProduct = await addProduct(temp, nombre);
      //onChange(newProduct._id, '_id');
    }
  };
  const loadProduct = async () => {
    if (id.length === 0) return;
    const product = await loadProductId(id);
    setFormValue({
      _id: id,
      categoriaId: product.categoria._id,
      img: product.img || '',
      nombre,
    });
  };
  useEffect(() => {
    loadProduct();
  }, []);
  const takePhoto = () => {
    launchCamera({mediaType: 'photo', quality: 0.5}, resp => {
      if (resp.didCancel) return;
      if (!resp.assets) return;
      const {uri} = resp.assets[0];
      setTempUri(uri);
      uploadImage(resp, _id);
    });
  };
  const getPhotoGallery = () => {
    launchImageLibrary({mediaType: 'photo', quality: 0.5}, resp => {
      if (resp.didCancel) return;
      if (!resp.assets) return;
      const {uri} = resp.assets[0];
      setTempUri(uri);
      uploadImage(resp, _id);
    });
  };
  if (isLoading) return <LoadingScreen />;
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del produto: {name}</Text>
        <TextInput
          placeholder="Producto"
          style={styles.input}
          value={nombre}
          onChangeText={value => onChange(value, 'nombre')}
        />
        <Text style={styles.label}>Categoria: </Text>
        <Picker
          selectedValue={categoriaId}
          onValueChange={(itemValue, itemIndex) =>
            onChange(itemValue, 'categoriaId')
          }>
          {categories.map(c => (
            <Picker.Item label={c.nombre} value={c._id} key={c._id} />
          ))}
        </Picker>
        <Button title="Guardar" onPress={safeOrUpdate} color="#5856D6" />
        {_id.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Button title="Camara" onPress={takePhoto} color="#5856D6" />
            <View style={{width: 10}} />
            <Button title="Galeria" onPress={getPhotoGallery} color="#5856D6" />
          </View>
        )}
        {img.length > 0 && !tempUri && (
          <Image
            source={{uri: img}}
            style={{marginTop: 20, height: 300, width: '100%'}}
          />
        )}
        {tempUri && (
          <Image
            source={{uri: tempUri}}
            style={{marginTop: 20, height: 300, width: '100%'}}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 45,
    marginTop: 5,
    marginBottom: 15,
  },
});

export default ProductScreen;
