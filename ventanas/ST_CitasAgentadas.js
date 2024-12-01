import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CitasAgendadas = () => {
  const [citas, setCitas] = useState([]); // Estado para almacenar las citas
  const [loading, setLoading] = useState(true); // Estado para manejar el indicador de carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Función para obtener las citas agendadas desde el backend
  const fetchCitasAgendadas = async () => {
    try {
      setLoading(true);

      // Obtener el token y el RUT del usuario almacenados en AsyncStorage
      const token = await AsyncStorage.getItem('token');
      const rut = await AsyncStorage.getItem('rut');
      console.log('Token:', token, 'RUT:', rut);

      if (!token || !rut) {
        setError('No se encontró el token o el RUT. Inicia sesión nuevamente.');
        setLoading(false);
        return;
      }

      // Obtener el ID del usuario utilizando el RUT
      const userResponse = await fetch(`http://190.114.255.204:3000/auth/usuario/${rut}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (userResponse.status !== 200) {
        setError('Error al obtener el ID del usuario.');
        setLoading(false);
        return;
      }

      const userData = await userResponse.json();
      const userId = userData.ID_User;

      // Obtener las citas agendadas del usuario
      const citasResponse = await fetch(`http://190.114.255.204:3000/auth/reservas/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (citasResponse.status === 200) {
        const citasData = await citasResponse.json();
        setCitas(citasData);
      } else if (citasResponse.status === 404) {
        setCitas([]); // No hay citas para el usuario
      } else {
        setError('Error al obtener las citas agendadas.');
      }
    } catch (error) {
      setError('Ocurrió un error al cargar las citas.');
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar las citas al montar el componente
  useEffect(() => {
    fetchCitasAgendadas();
  }, []);

  // Renderizar cada cita
  const renderCita = ({ item }) => (
    <TouchableOpacity style={styles.citaItem}>
      <Text style={styles.citaText}>Médico: {item.Nom_medic} {item.Apelli_medic}</Text>
      <Text style={styles.citaText}>Especialidad: {item.Nom_espe}</Text>
      <Text style={styles.citaText}>Fecha: {new Date(item.FechaHora).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Sección superior */}
      <View style={styles.topContainer}>
        <Text style={styles.title}>Citas Médicas Agendadas</Text>
        <Text style={styles.subtitle}>Revisar tus próximas citas médicas</Text>
      </View>

      {/* Sección inferior */}
      <View style={styles.bottomContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#00796b" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : citas.length > 0 ? (
          <FlatList
            data={citas}
            keyExtractor={(item) => item.ID_Reserva.toString()}
            renderItem={renderCita}
          />
        ) : (
          <Text style={styles.noCitasText}>No tienes citas agendadas</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  /* Sección superior */
  topContainer: {
    flex: 1.3,
    backgroundColor: '#49daee',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
  /* Sección inferior */
  bottomContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  citaItem: {
    padding: 10,
    backgroundColor: '#e0f7fa',
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
  },
  citaText: {
    fontSize: 16,
    color: '#00796b',
    marginBottom: 5,
  },
  noCitasText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default CitasAgendadas;
