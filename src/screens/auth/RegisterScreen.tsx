import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import WhiteLogo from '../../components/WhiteLogo';
import {authStyles} from '../../theme/authTheme';
import useForm from '../../hooks/useForm';
import {AuthContext} from '../../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

const RegisterScreen = ({navigation}: Props) => {
  const {singUp, errorMessage, removeError} = useContext(AuthContext);
  const {form, onChange} = useForm({
    name: '',
    email: '',
    password: '',
  });
  useEffect(() => {
    if (errorMessage.length === 0) return;
    Alert.alert('Registro incorrecto', errorMessage, [
      {
        text: 'OK',
        onPress: removeError,
      },
    ]);
  }, [errorMessage]);
  const {name, email, password} = form;
  const onSubmit = () => {
    Keyboard.dismiss();
    singUp({nombre: name, correo: email, password});
  };
  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: '#5856D6'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={authStyles.formContainer}>
          <WhiteLogo />
          <Text style={authStyles.title}>Register</Text>
          <Text style={authStyles.label}>Nombre:</Text>
          <TextInput
            placeholder="Ingrese su nombre"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            style={[
              authStyles.inputField,
              Platform.OS === 'ios' && authStyles.inputFieldIos,
            ]}
            selectionColor="white"
            onChangeText={value => onChange(value, 'name')}
            value={name}
            onSubmitEditing={onSubmit}
            autoCapitalize="words"
            autoCorrect={false}
          />
          <Text style={authStyles.label}>Email:</Text>
          <TextInput
            placeholder="Ingrese su email"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"
            style={[
              authStyles.inputField,
              Platform.OS === 'ios' && authStyles.inputFieldIos,
            ]}
            selectionColor="white"
            onChangeText={value => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onSubmit}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={authStyles.label}>Contraseña:</Text>
          <TextInput
            placeholder="*********"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            style={[
              authStyles.inputField,
              Platform.OS === 'ios' && authStyles.inputFieldIos,
            ]}
            selectionColor="white"
            onChangeText={value => onChange(value, 'password')}
            value={password}
            secureTextEntry={true}
            onSubmitEditing={onSubmit}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View style={authStyles.btnContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={authStyles.btn}
              onPress={onSubmit}>
              <Text style={authStyles.btnText}>Crear cuenta</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.replace('LoginScreen')}
            style={authStyles.btnReturn}>
            <Text style={authStyles.btnText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default RegisterScreen;
