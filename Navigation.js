import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

//ventanas
import HomeMenu from './ventanas/HomeMenu';

const Tab = createBottomTabNavigator();

function MisTabs() {
  return (
    <Tab.Navigator>
        <Tab.Screen name='HomeMenu' component={HomeMenu} />
    </Tab.Navigator>
  );
}

export default function Navigator() {
    return (
        <NavigationContainer>
            <MisTabs />
        </NavigationContainer>
    );
}