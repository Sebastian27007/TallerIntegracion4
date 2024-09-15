import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

//iconos
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';

//ventanas
import Home from './ventanas/Home';
import Settings from './ventanas/Settings'
import Solicitar from './ventanas/SolicitarHora';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
    return (
        <Tab.Navigator initialRouteName='Home'>
          <Tab.Screen 
            name='Home' 
            component={Home} 
            options={{ 
              tabBarLabel: 'Inicio',
              tabBarIcon: () => (
                <MaterialCommunityIcons name="home-circle" size={26}/>
              ),
              headerShown: false,
            }}> 
          </Tab.Screen>
          <Tab.Screen
            name='Agendar Horas medicas'
            component={Solicitar}
            options={{
              tabBarLabel: 'Agendar',
              tabBarIcon: () => (<Entypo name="clipboard" size={24} color="black" />),
            }}>
          </Tab.Screen>
          <Tab.Screen 
            name='Configuración de cuenta' 
            component={Settings} 
            options={{ 
              tabBarLabel: 'Configuración', 
              tabBarIcon: () => (
                <MaterialCommunityIcons name="account-edit" size={26}/>
              ), 
              //headerShown: false,
            }}>
          </Tab.Screen>
        </Tab.Navigator>
    );
}