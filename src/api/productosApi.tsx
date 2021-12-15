import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Andrea 192.168.100.10
//Sebastian 192.168.0.107
//192.168.0.111
const baseURL = 'http://192.168.0.101:8080/api';

const productosApi = axios.create({baseURL});

productosApi.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    //config.headers['x-token'] = token;
    config.headers['x-token'] = token;
  }
  return config;
});

export default productosApi;
