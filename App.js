import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RecuperarClave from './ventanas/RecuperarClave';
import Login from './ventanas/Login';
import CrearCuenta from './ventanas/CrearCuenta';
import TablasComponent from './tablas';
import Navigation from './Navigation';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="RecuperarClave" 
          component={RecuperarClave} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Navigation" 
          component={Navigation} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="CrearCuenta" 
          component={CrearCuenta} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Tablas" 
          component={TablasComponent} 
          options={{ headerShown: false }} // Asegúrate de que aquí esté el componente correcto
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
