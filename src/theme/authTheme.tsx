import {StyleSheet} from 'react-native';

export const authStyles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    height: 600,
    marginBottom: 50,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
  label: {
    marginTop: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  inputField: {
    color: 'white',
    fontSize: 20,
  },
  inputFieldIos: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    paddingBottom: 4,
  },
  btnContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  btn: {
    borderWidth: 2,
    borderColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
  },
  btnText: {
    fontSize: 18,
    color: 'white',
  },
  newUserContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  btnReturn: {
    position: 'absolute',
    top: 50,
    left: 20,
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
  },
});
