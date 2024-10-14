import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button, Provider as PaperProvider } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const EspecialidadesComponent = () => {
  const [selectedEspecialidad, setSelectedEspecialidad] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const especialidades = [
    { id: 1, nombre: 'Cardiología', descripcion: 'Especialistas en el corazón y el sistema circulatorio.' },
    { id: 2, nombre: 'Dermatología', descripcion: 'Cuidado y tratamiento de la piel y sus enfermedades.' },
    { id: 3, nombre: 'Ginecología', descripcion: 'Atención especializada en la salud femenina.' },
    { id: 4, nombre: 'Pediatría', descripcion: 'Cuidado médico para bebés, niños y adolescentes.' },
    { id: 5, nombre: 'Neurología', descripcion: 'Tratamiento de trastornos del sistema nervioso.' }
  ];

  const handleSelectEspecialidad = (especialidad) => {
    setSelectedEspecialidad(especialidad);
    setShowTimePicker(true); // Mostrar selector de horas al elegir especialidad
  };

  const handleTimeChange = (event, date) => {
    const selected = date || selectedDate;
    setSelectedDate(selected);
    setShowTimePicker(false); // Ocultar selector de horas después de seleccionar
  };

  return (
    <PaperProvider>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Selecciona una Especialidad</Text>

        {especialidades.map((especialidad) => (
          <Card key={especialidad.id} style={styles.card}>
            <Card.Content>
              <Text style={styles.especialidadTitle}>{especialidad.nombre}</Text>
              <Text style={styles.especialidadDesc}>{especialidad.descripcion}</Text>
            </Card.Content>
            <Card.Actions>
              <Button 
                mode="contained" 
                onPress={() => handleSelectEspecialidad(especialidad)}>
                Seleccionar {especialidad.nombre}
              </Button>
            </Card.Actions>
          </Card>
        ))}

        {/* Muestra el selector de fecha y hora */}
        {showTimePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="datetime"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        {selectedEspecialidad && !showTimePicker && (
          <View style={styles.selectedEspecialidad}>
            <Text style={styles.selectedText}>
              Has seleccionado {selectedEspecialidad.nombre}. Hora: {selectedDate.toLocaleString()}
            </Text>
          </View>
        )}
      </ScrollView>
    </PaperProvider>
  );
};

export default EspecialidadesComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  especialidadTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 8,
  },
  especialidadDesc: {
    fontSize: 16,
    color: '#616161',
  },
  selectedEspecialidad: {
    padding: 16,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#E0F7FA',
  },
  selectedText: {
    fontSize: 18,
    color: '#00796B',
    textAlign: 'center',
  },
});
