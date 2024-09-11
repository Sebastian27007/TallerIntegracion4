import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Inicio (Home)</Text>
      <Text style={styles.subtitle}>Bienvenido a la pantalla principal</Text>
      
      {/* Un botón opcional para navegar a otra pantalla si lo deseas */}
      <Button 
        title="Ir a Configuración" 
        onPress={() => navigation.navigate('Settings')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
  },
});
