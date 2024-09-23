import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from "expo-status-bar";
import Icon from 'react-native-vector-icons/Ionicons';

export default function Login({ navigation }) {
    return (
      <View style={styles.container}>
        <View style={styles.upperSection}>
        <Image source={require('../logo.png')} style={styles.logo} />
        <Text style={styles.titulo}>Bienvenido</Text>
        </View>

        <View style={styles.lowerSection}>
          <Text style={styles.subtitulo}>Accede a tu cuenta</Text>
          <View style={styles.inputContainer}>
            <Icon name="mail-outline" size={24} color="gray" style={styles.icon} />
            <TextInput 
              placeholder='usuario@gmail.com'
              style={styles.texto_inputs}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="key-outline" size={24} color="gray" style={styles.icon} />
            <TextInput 
              placeholder='contraseña'
              style={styles.texto_inputs}
              secureTextEntry={true}
            />
          </View>

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
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    upperSection: { 
      flex: 2,
      backgroundColor: '#49daee',
      alignItems: 'center',
      justifyContent: 'center', 
    },
    lowerSection: {
      flex: 3, 
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    justifyContent: 'flex-start', 
    paddingTop: 70,
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
    inputContainer: {
      flexDirection: 'row',  // Alinea el icono y el input en fila
      alignItems: 'center',  // Alinea verticalmente al centro
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 30,
      backgroundColor: '#fff',
      paddingHorizontal: 10,
      width: '70%',
      height: 50,
      marginTop: 20,
    },
    icon: {
      marginRight: 10,  // Añade espacio entre el icono y el TextInput
    },
    texto_inputs: {
      //borderWidth: 1,
      flex: 1,
      paddingHorizontal: 10,
      textAlign: 'center',
      height: '100%',
      fontSize: 16,
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
  