import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function HomeMenu() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>¡Bienvenido a la pantalla Home!</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'System',
  }
});
