import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

export default function CrearCuenta({ navigation }) {

  //Estados para almacenar el rut y la contraseña
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //Función que se ejecutara al crear una cuenta
  const handleRegister = async () => {

    //Validamos la contraseña
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {

      //Hacemos la petición al backend para el registro de los usuarios
      const response = await axios.post('http://190.114.255.204:3306/usuario', {
        rut: rut,
        password: password,
      });

      //Mensaje existoso de registro
      Alert.alert('Éxito', response.data);

      //Volver a la ventana Login
      navigation.goBack();
      
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Error en la respuesta del servidor:', error.response.data);
      Alert.alert('Error', `Error en la respuesta: ${error.response.status}`);
    } else if (error.request) {
      // No se recibió ninguna respuesta, el problema es con la solicitud
      console.error('Error en la solicitud: No se recibió respuesta', error.request);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    } else {
      // Error configurando la solicitud
      console.error('Error en la configuración de la solicitud:', error.message);
      Alert.alert('Error', 'Hubo un error al hacer la solicitud');
    }
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Crear una cuenta</Text>

      <TextInput 
        placeholder='RUT'
        style={styles.texto_inputs}
        value={rut}
        onChangeText={setRut} //Guardamos el rut en el state
      />
      <TextInput 
        placeholder='Contraseña'
        style={styles.texto_inputs}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword} //Guardamos la contraseña en el state
      />
      <TextInput 
        placeholder='Confirmar contraseña'
        style={styles.texto_inputs}
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword} //Guardamos la confirmación de la contraseña
      />

      <TouchableOpacity style={styles.boton} onPress={handleRegister}>
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
    backgroundColor: 'white',
    marginTop: 100,
  },
  volver: {
    fontSize: 14,
    fontFamily: 'System',
    color: 'gray',
    marginTop: 20,
  }
});