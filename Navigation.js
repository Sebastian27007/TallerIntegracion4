import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

//ventanas
import Home from './ventanas/Home';
import Settings from './ventanas/Settings'

const Tab = createBottomTabNavigator();

export default function MyTabs() {
    return (
        <Tab.Navigator>
          <Tab.Screen name='Home' component={Home}></Tab.Screen>
          <Tab.Screen name='Settings' component={Settings}></Tab.Screen>
        </Tab.Navigator>
    );
}