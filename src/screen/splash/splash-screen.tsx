import React, { SFC, useState, useEffect } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';
import { store } from '@state/index'
//import { appInit } from '@domain/lifecycle/app-init';
import { getAuthAction, setJWTAction } from '@state/auth';

type StateParams = {
  //declare nav state params here
}

interface Props extends Navigation<StateParams> {
  //declare props here
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'column', backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 10, marginHorizontal: 20 },
  button: { height: 40, width: '80%', marginHorizontal: '10%', backgroundColor: 'grey' },
  buttonText: { color: 'white', fontSize: 20, textAlign: 'center', marginTop: 8 }
})

export const SplashScreen: SFC<Props> = ({ }) => {
  const [user, setUser] = useState('truman.marcos@foomail.org');
  const [pass, setPass] = useState('AqSMUhGxgy');
  const [jwt, setJWT] = useState('');

  useEffect(() => {
    //appInit().fork(console.error, () => navigation.navigate("ProductList"))
  }, [])

  return (
    <View style={{ marginVertical: 40 }}>
      <TextInput
        style={{ ...styles.input, marginTop: 120 }}
        placeholder={'email@address.here'}
        autoCapitalize={'none'}
        onChangeText={setUser}
        value={user}
      />
      <TextInput
        style={styles.input}
        placeholder={'passWordHere'}
        autoCapitalize={'none'}
        onChangeText={setPass}
        value={pass}
        secureTextEntry={true}
      />
      {/* <TextInput
        style={styles.input}
        placeholder={'JWT'}
        onChangeText={setJWT}
        value={pass}
        secureTextEntry={true}
      /> */}
      <TouchableOpacity style={styles.button} onPress={() => {
        if (jwt) store.dispatch(setJWTAction(jwt))
        else store.dispatch(getAuthAction(user, pass))
      }}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}