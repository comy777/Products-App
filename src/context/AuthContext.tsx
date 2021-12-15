import React, {createContext, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import productosApi from '../api/productosApi';
import {
  User,
  LoginResponse,
  LoginData,
  RegisterData,
} from '../interfaces/interfaces';
import {authReducer, AuthState} from './authReducer';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: User | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  singUp: (registerData: RegisterData) => void;
  singIn: (loginData: LoginData) => void;
  logOut: () => void;
  removeError: () => void;
};

const authInitialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

const AuthContextProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);
  const validarToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return dispatch({type: 'notAuthenticated'});
    const resp = await productosApi.get('/auth');
    if (resp.status !== 200) {
      return dispatch({type: 'notAuthenticated'});
    }
    const {data} = resp;
    await AsyncStorage.setItem('token', data.token);
    dispatch({
      type: 'signUp',
      payload: {
        token: data.token,
        user: data.user,
      },
    });
  };
  useEffect(() => {
    validarToken();
  }, []);
  const singIn = async ({correo, password}: LoginData) => {
    try {
      const resp = await productosApi.post<LoginResponse>('/auth/login', {
        correo,
        password,
      });
      const {data} = resp;
      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.user,
        },
      });
      await AsyncStorage.setItem('token', data.token);
    } catch (error: any) {
      dispatch({
        type: 'addError',
        payload: error.response.data.msg || 'Informacion incorrecta',
      });
      console.log(error.response.data.msg);
    }
  };
  const singUp = async ({nombre, correo, password}: RegisterData) => {
    try {
      const resp = await productosApi.post<LoginResponse>('usuarios/', {
        nombre,
        correo,
        password,
        rol: 'USER_ROLE',
      });
      const {data} = resp;
      console.log(data);

      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.user,
        },
      });
      await AsyncStorage.setItem('token', data.token);
    } catch (error: any) {
      console.log(error.response.data);
      dispatch({
        type: 'addError',
        payload: error.response.data.errors[0].msg || 'Informacion incorrecta',
      });
    }
  };
  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type: 'logOut'});
  };
  const removeError = () => {
    dispatch({type: 'removeError'});
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        singIn,
        singUp,
        logOut,
        removeError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
