import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from "expo-status-bar";

export default function Login({ navigation }) {
    return (
      <View style={styles.container}>
        <Image source={require('./logo.png')} style={styles.logo} />
        <Text style={styles.titulo}>Bienvenido</Text>
        <Text style={styles.subtitulo}>Accede a tu cuenta</Text>
        <TextInput 
          placeholder='usuario@gmail.com'
          style={styles.texto_inputs}
        />
        <TextInput 
          placeholder='contraseña'
          style={styles.texto_inputs}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={() => navigation.navigate('RecuperarClave')}>
          <Text style={styles.olvidaste_contraseña}>Olvidaste tu contraseña</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CrearCuenta')}>
          <Text style={styles.olvidaste_contraseña}>¿No tienes una cuenta? Registrate.</Text>
        </TouchableOpacity>
        <StatusBar style="auto" /> 
        <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Navigation')}>
          <Text style={{fontSize: 17, fontWeight: '400', color: 'grey', fontFamily: 'System',}}>Ingresar</Text>
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
    logo: {
      width: 100, 
      height: 100,
      marginBottom: 20, // Espacio entre el logo y el título
    },
    titulo: {
      fontSize: 55,
      color: '#000',
      fontWeight: 'bold',
      fontFamily: 'System' 
    },
    subtitulo: {
      fontSize: 20,
      color: 'gray',
      fontFamily: 'System'
    },
    texto_inputs: {
      //borderWidth: 1,
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
    olvidaste_contraseña: {
      fontSize: 14,
      fontFamily: 'System',
      color: 'gray',
      marginTop: 20,
    },
    boton : {
      width: 180,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
      backgroundColor: 'white',
      marginTop: 30
    },
});
  