// screens/RecuperarContraseña.js
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function CrearCuenta({ navigation }) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Crear una cuenta</Text>
        <TextInput 
          placeholder='Nombre completo'
          style={styles.texto_inputs}
        />
        <TextInput 
          placeholder='Correo electrónico'
          style={styles.texto_inputs}
        />
        <TextInput 
          placeholder='Contraseña'
          style={styles.texto_inputs}
          secureTextEntry={true}
        />
        <TextInput 
          placeholder='Confirmar contraseña'
          style={styles.texto_inputs}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.boton}>
          <Text style={{fontSize: 17, fontWeight: '400', color: 'grey', fontFamily: 'System',}}>Crear cuenta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.volver}>Volver al inicio</Text>
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
      fontSize: 30,
      color: '#000',
      fontWeight: 'bold',
      fontFamily: 'System',
      marginBottom: 20,
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
    volver: {
      fontSize: 14,
      fontFamily: 'System',
      color: 'gray',
      marginTop: 20,
    }
  });
