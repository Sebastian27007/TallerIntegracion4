import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const navigation = useNavigation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rutUsuario, setRutUsuario] = useState(null)

  const tips = "Recuerda beber 8 vasos de agua al día para mantenerte hidratado.";

  //Verificamos si el usuario tiene un token valido
  const checkAuthentication = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsAuthenticated(true);
        const rut = await AsyncStorage.getItem('rut');
        setRutUsuario(rut);
      } else {
        navigation.navigate('Login'); //Redirigir al login si no hay token
      }
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      navigation.navigate('Login'); //Redirigir al login si ocurre algun error
    }
  };

  useEffect(() => {
    checkAuthentication(); //Verificamos autenticación al cargar la pantalla
  }, []);

  return (
    isAuthenticated ? (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.welcomeText}>Bienvenido</Text> 
          <Text style={styles.rutText}>{rutUsuario}</Text>
          <Text style={styles.subText}>Esperamos que tengas un excelente día.</Text>

          <View style={styles.menuContainer}>
            
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigation.navigate('Citas medicas agendadas')}>
              <View style={styles.iconWithText}>
                <Icon name='calendar' size={40} color={"white"} />
                <Text style={styles.menuText}>Citas</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigation.navigate('Reprogramas horas agendadas')}>
              <View style={styles.iconWithText}>
                <Icon name='clock-o' size={40} color={"white"} />
                <Text style={styles.menuText}>Reprogramar</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigation.navigate('Cancelar hora medica agendada')}>
              <View style={styles.iconWithText}>
                <Icon name='times-circle' size={40} color={"white"} />
                <Text style={styles.menuText}>Cancelar</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.tipText}>{tips}</Text>
        </View>
      </View>
    ) : (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#49daee',
  },
  topContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'System'
  },
  rutText: {  
    fontSize: 18,
    color: 'white',
    marginTop: 10,
    fontFamily: 'System',
  },
  subText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'System',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  menuButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWithText: {
    alignItems: 'center', // Alinea icono y texto verticalmente
  },
  menuText: {
    color: 'white',
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'System',
  },
  bottomContainer: {
    flex: 2,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tipText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
    textAlign: 'center',
  },
});

export default Home;