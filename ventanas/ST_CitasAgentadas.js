import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

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

  const generatePDF = async () => {
    if (citas.length === 0) {
      Alert.alert('No hay citas', 'No tienes citas para generar el PDF.');
      return;
    }

    const htmlContent = `
      <h1 style="text-align: center; color: #00796b;">Citas Médicas Agendadas</h1>
      <table style="width: 100%; border-collapse: collapse; text-align: left;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px;">Médico</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Especialidad</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Fecha</th>
          </tr>
        </thead>
        <tbody>
          ${citas.map(
            (cita) => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${cita.Nom_medic} ${cita.Apelli_medic}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${cita.Nom_espe}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${new Date(cita.FechaHora).toLocaleString()}</td>
              </tr>
            `
          ).join('')}
        </tbody>
      </table>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      // Verificar si el dispositivo soporta compartir el archivo
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert('PDF generado', `El archivo PDF se guardó en: ${uri}`);
      }
    } catch (error) {
      Alert.alert('Error al generar el PDF', error.message);
    }
  };

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
          <>
          <FlatList
            data={citas}
            keyExtractor={(item) => item.ID_Reserva.toString()}
            renderItem={renderCita}
          />
          <TouchableOpacity style={styles.exportButton} onPress={generatePDF}>
            <Text style={styles.exportButtonText}>Exportar a PDF</Text>
          </TouchableOpacity>
        </>
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
    fontFamily: 'System',
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
  exportButton: {
    backgroundColor: '#00796b',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  exportButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'System',
  },
});

export default CitasAgendadas;
