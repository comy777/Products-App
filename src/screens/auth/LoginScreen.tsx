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
import Background from '../../components/Background';
import WhiteLogo from '../../components/WhiteLogo';
import {authStyles} from '../../theme/authTheme';
import useForm from '../../hooks/useForm';
import {AuthContext} from '../../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

const LoginScreen = ({navigation}: Props) => {
  const {form, onChange} = useForm({
    email: '',
    password: '',
  });
  const {email, password} = form;
  const {singIn, errorMessage, removeError} = useContext(AuthContext);
  useEffect(() => {
    if (errorMessage.length === 0) return;
    Alert.alert('Login incorrecto', errorMessage, [
      {
        text: 'OK',
        onPress: removeError,
      },
    ]);
  }, [errorMessage]);
  const onSubmit = () => {
    console.log(form);

    Keyboard.dismiss();
    singIn({correo: email, password});
  };
  return (
    <>
      <Background />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={authStyles.formContainer}>
          <WhiteLogo />
          <Text style={authStyles.title}>Login</Text>
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
            //TODO onchage value
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
            //TODO onchage value
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
              <Text style={authStyles.btnText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={authStyles.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace('RegisterScreen')}>
              <Text style={authStyles.btnText}>Nueva cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;
