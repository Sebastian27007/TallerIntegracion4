import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from "expo-status-bar";
import AntDesign from '@expo/vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import { Modal } from "react-native-web";

export default function Login({ navigation }) {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('', {
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({rut, Contraseña: password}),
      });

      if (AuthenticatorResponse.status === 200 ){
        //Inicio de sesión exitoso
        const data = await response.json();
        const token = data.token; // Obtenemos el token desde la respuesta del backend

        //Almacenamos el token en un lugar seguro por si más adelante lo ocupamos
        await AsyncStorage.setItem('token', token);

        //Navegamos a la pantalla de inicio pasando el rut del usuario
        const rutUsuario = data.rut;
        navigation.navigate('Inicio', {rut: rutUsuario});
      } else {
        //Mostramos un mensaje de error si la autenticación falla
        setErrorModalVisible(true);
        setErrorMessage('Los datos incorrectos. Intentalo nuevamente');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      setErrorModalVisible(true);
      setErrorMessage('Ocurrió un error en el servidor. Inténtalo más tarde.');
    }
  };

    return (
      <View style={styles.container}>
        <View style={styles.upperSection}>
          <Image source={require('../logo.png')} style={styles.logo} />
          <Text style={styles.titulo}>Bienvenido</Text>
        </View>
        
        <View style={styles.lowerSection}>
          <Text style={styles.subtitulo}>Accede a tu cuenta</Text>
          <View style={styles.inputContainer}>
            <AntDesign name="user" size={24} color="gray" />
            <TextInput 
              placeholder='RUT'
              style={styles.texto_inputs}
              onChangeText={setRut}
              value={rut}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="key-outline" size={24} color="gray" style={styles.icon} />
            <TextInput 
              placeholder='contraseña'
              style={styles.texto_inputs}
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
            />
          </View>

          <Modal
            visible={errorModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setErrorModalVisible(false)}
          >
            <View style={styles.errorModal}>
              <View style={styles.errorModalContent}>
                <Text style={styles.errorText}>
                  {errorMessage}
                </Text>
                <TouchableOpacity
                  style={styles.errorButton}
                  onPress={() => setErrorModalVisible(false)}
                >
                  <Text style={styles.errorButtonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <TouchableOpacity onPress={() => navigation.navigate('RecuperarClave')}>
            <Text style={styles.olvidaste_contraseña}>Olvidaste tu contraseña</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CrearCuenta')}>
            <Text style={styles.olvidaste_contraseña}>¿No tienes una cuenta? Regístrate.</Text>
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
      justifyContent: 'flex-start', 
      paddingTop: 70,
    },
    logo: {
      width: 100, 
      height: 100,
      marginBottom: 20,
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
      flexDirection: 'row',
      alignItems: 'center',
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
      marginRight: 10,
    },
    texto_inputs: {
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
    boton: {
      width: 180,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
      backgroundColor: 'white',
      marginTop: 30
    },
    errorModal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    errorModalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 5,
      alignItems: 'center',
    },
    errorText: {
      fontSize: 18,
      marginBottom: 20,
    },
    errorButton: {
      backgroundColor: '#00ADB5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    },
    errorButtonText: {
      fontSize: 18,
      color: 'white',
    },
});
