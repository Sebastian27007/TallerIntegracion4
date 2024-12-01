import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CitasAgendadas = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener citas agendadas desde el backend
  const fetchCitasAgendadas = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const rut = await AsyncStorage.getItem('rut');

      if (!token || !rut) {
        setError('No se encontró el token o el RUT. Inicia sesión nuevamente.');
        setLoading(false);
        return;
      }

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
        setCitas([]);
      } else {
        setError('Error al obtener las citas agendadas.');
      }
    } catch (error) {
      setError('Ocurrió un error al cargar las citas.');
    } finally {
      setLoading(false);
    }
  };

  // Eliminar una cita médica
  const eliminarCita = async (idReserva) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://190.114.255.204:3000/auth/reservas/${idReserva}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        Alert.alert('Cita eliminada', 'La cita médica se eliminó correctamente.');
        fetchCitasAgendadas(); // Recargar citas después de eliminar
      } else if (response.status === 404) {
        Alert.alert('Error', 'No se encontró la cita médica.');
      } else {
        Alert.alert('Error', 'No se pudo eliminar la cita médica.');
      }
    } catch (error) {
      console.error('Error al eliminar la cita:', error);
      Alert.alert('Error', 'Ocurrió un error al eliminar la cita.');
    }
  };

  useEffect(() => {
    fetchCitasAgendadas();
  }, []);

  const renderCita = ({ item }) => (
    <View style={styles.citaItem}>
      <Text style={styles.citaText}>Médico: {item.Nom_medic} {item.Apelli_medic}</Text>
      <Text style={styles.citaText}>Especialidad: {item.Nom_espe}</Text>
      <Text style={styles.citaText}>Fecha: {new Date(item.FechaHora).toLocaleString()}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() =>
          Alert.alert(
            'Eliminar cita',
            '¿Estás seguro de que deseas eliminar esta cita?',
            [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Eliminar', onPress: () => eliminarCita(item.ID_Reserva) },
            ],
            { cancelable: true }
          )
        }
      >
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Citas Médicas Agendadas</Text>
        <Text style={styles.subtitle}>Gestiona tus citas agendadas</Text>
      </View>

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
  deleteButton: {
    backgroundColor: '#e53935',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
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
