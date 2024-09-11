import { StatusBar } from 'expo-status-bar'; //barra superior de hora y bateria, se utiliza con estilo automatico (black/white)
import React from 'react'; //por default hay que tenerlo
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import RecuperarClave from './ventanas/RecuperarClave';
import Login from './ventanas/Login';
import Navigation from './Navigation'
import CrearCuenta from './ventanas/CrearCuenta';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="RecuperarClave" component={RecuperarClave} options={{ headerShown: false }}/>
        <Stack.Screen name='Navigation' component={Navigation} options={{ headerShown: false }}/>
        <Stack.Screen name='CrearCuenta' component={CrearCuenta} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
