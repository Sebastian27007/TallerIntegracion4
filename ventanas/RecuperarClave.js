// screens/RecuperarContraseña.js
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function RecuperarClave() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Recuperar Contraseña</Text>
      <TextInput 
        placeholder='Introduce tu correo electrónico'
        style={styles.texto_inputs}
      />
      <TouchableOpacity style={styles.boton}>
        <Text style={{fontSize: 17, fontWeight: '400', color: 'grey', fontFamily: 'System',}}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 55,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'System'
  },
  texto_inputs: {
    borderColor: 'gray',
    padding: 10,
    paddingStart: 20,
    width: '70%',
    marginTop: 20,
    textAlign: 'center',
    borderRadius: 30,
    height: 50,
    backgroundColor: '#fff',
  },
  boton: {
    width: 180,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: 'white'
  },
});
