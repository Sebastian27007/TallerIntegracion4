import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";

//iconos
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';

//ventanas
import Home from './ventanas/Home';
import Settings from './ventanas/Settings'
import Solicitar from './ventanas/SolicitarHora';
import CitasAgendadas from './ventanas/ST_CitasAgentadas';
import ReprogramarHora from './ventanas/ST_ReprogramarHora';
import Cancelar from './ventanas/ST_CancelarHoras';
import Preguntas from './ventanas/Help.User';
//STACK
const HomeStackNavigator = createStackNavigator();

function MyStack() {
  return (
    <HomeStackNavigator.Navigator initialRouteName='Home'>
      <HomeStackNavigator.Screen
        name='Home'
        component={Home}
        options={{ headerShown: false }}
      />
      <HomeStackNavigator.Screen
        name="Citas medicas agendadas"
        component={CitasAgendadas}
      />
      <HomeStackNavigator.Screen
        name='Reprogramar horas agendadas'
        component={ReprogramarHora}
      />
      <HomeStackNavigator.Screen
        name='Cancelar hora medica agendada'
        component={Cancelar}
      />
      <HomeStackNavigator.Screen
        name='Preguntas frecuentes'
        component={Preguntas}
      />
    </HomeStackNavigator.Navigator>
  )
}

//TAB
const Tab = createBottomTabNavigator();

export default function MyTabs() {
    return (
        <Tab.Navigator initialRouteName='Home'>
          <Tab.Screen 
            name='GetMed' 
            component={MyStack} 
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
              headerShown: false,
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