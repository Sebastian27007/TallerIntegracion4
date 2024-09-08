import { StatusBar } from 'expo-status-bar'; //barra superior de hora y bateria, se utiliza con estilo automatico (black/white)
import React from 'react'; //por default hay que tenerlo
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'; //nos permite crear la función y guardarla en la variable styles
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RecuperarClave from './ventanas/RecuperarClave';
import CrearCuenta from './ventanas/CrearCuenta';

const Stack = createStackNavigator();

function Inicio({ navigation }) {
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
        <Text style={styles.olvidaste_contraseña}>¿No tienes una cuenta?</Text>
      </TouchableOpacity>
      <StatusBar style="auto" /> 
      <TouchableOpacity style={styles.boton}>
        <Text style={{fontSize: 17, fontWeight: '400', color: 'grey', fontFamily: 'System',}}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Inicio} options={{ headerShown: false }}/>
        <Stack.Screen name="RecuperarClave" component={RecuperarClave} options={{ headerShown: false }}/>
        <Stack.Screen name='CrearCuenta' component={CrearCuenta} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
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
    backgroundColor: 'white'
  },



});
