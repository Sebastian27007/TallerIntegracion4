import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const CitasAgendadas = () => {
  // Datos de ejemplo para las citas agendadas
  const citas = [
    { id: 1, medico: 'Dr. Juan Pérez', especialidad: 'Cardiología', fecha: '2024-12-01 10:00' },
    { id: 2, medico: 'Dra. Ana García', especialidad: 'Dermatología', fecha: '2024-12-02 14:30' },
    { id: 3, medico: 'Dr. Mario López', especialidad: 'Pediatría', fecha: '2024-12-03 09:00' },
  ];

  const renderCita = ({ item }) => (
    <TouchableOpacity style={styles.citaItem}>
      <Text style={styles.citaText}>Médico: {item.medico}</Text>
      <Text style={styles.citaText}>Especialidad: {item.especialidad}</Text>
      <Text style={styles.citaText}>Fecha: {item.fecha}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Sección superior (2/6) */}
      <View style={styles.topContainer}>
        <Text style={styles.title}>Citas Médicas Agendadas</Text>
        <Text style={styles.subtitle}>Revisar tus próximas citas medicas</Text>
      </View>

      {/* Sección inferior (4/6) */}
      <View style={styles.bottomContainer}>
        {citas.length > 0 ? (
          <FlatList
            data={citas}
            keyExtractor={(item) => item.id.toString()}
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
  /* Sección superior (2/6) */
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
    fontFamily: 'System',
  },
  /* Sección inferior (4/6) */
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
});

export default CitasAgendadas;
