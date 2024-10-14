import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { Card, Button, Provider as PaperProvider, List } from 'react-native-paper';

const EspecialidadesComponent = () => {
  const [selectedEspecialidad, setSelectedEspecialidad] = useState(null);
  const [doctores, setDoctores] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [visible, setVisible] = useState(false);

  // Simulación de las especialidades
  const especialidades = [
    { nombre: "Cardiología", descripcion: "Especialidad que se ocupa del diagnóstico y tratamiento de enfermedades del corazón y del sistema circulatorio." },
    { nombre: "Dermatología", descripcion: "Rama de la medicina que se enfoca en el cuidado y tratamiento de la piel, cabello y uñas." },
    { nombre: "Ginecología", descripcion: "Especialidad que se centra en la salud reproductiva femenina, incluyendo el embarazo y trastornos ginecológicos." },
    { nombre: "Pediatría", descripcion: "Área dedicada al cuidado de la salud de bebés, niños y adolescentes." },
    { nombre: "Neurología", descripcion: "Especialidad que se ocupa del diagnóstico y tratamiento de trastornos del sistema nervioso." },
  ];

  // Simulación de doctores y horarios por especialidad
  const doctoresPorEspecialidad = {
    Cardiología: ["Dr. Juan Pérez", "Dra. María López"],
    Dermatología: ["Dr. Carlos Gómez", "Dra. Laura Torres"],
    Ginecología: ["Dra. Silvia Rodríguez", "Dr. Manuel García"],
    Pediatría: ["Dr. Pablo Díaz", "Dra. Andrea Ruiz"],
    Neurología: ["Dr. Fernando Sánchez", "Dra. Marta Jiménez"],
  };

  const horariosPorDoctor = {
    "Dr. Juan Pérez": ["10:00 AM", "11:00 AM", "3:00 PM"],
    "Dra. María López": ["9:00 AM", "1:00 PM", "4:00 PM"],
    "Dr. Carlos Gómez": ["8:00 AM", "12:00 PM", "2:00 PM"],
    "Dra. Laura Torres": ["9:30 AM", "11:30 AM", "5:00 PM"],
    // Puedes agregar más horarios a otros doctores según tu necesidad
  };

  const handleSelectEspecialidad = (especialidad) => {
    setSelectedEspecialidad(especialidad);
    setDoctores(doctoresPorEspecialidad[especialidad] || []);
  };

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setHorariosDisponibles(horariosPorDoctor[doctor] || []);
    setVisible(true);
  };

  const hideModal = () => setVisible(false);

  return (
    <PaperProvider>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Especialidades Médicas</Text>

        {especialidades.map((especialidad, index) => (
          <Card key={index} style={styles.card}>
            <Card.Content>
              <Text style={styles.especialidadTitle}>{especialidad.nombre}</Text>
              <Text style={styles.especialidadDesc}>{especialidad.descripcion}</Text>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained" onPress={() => handleSelectEspecialidad(especialidad.nombre)}>
                Seleccionar {especialidad.nombre}
              </Button>
            </Card.Actions>

            {selectedEspecialidad === especialidad.nombre && (
              <List.Section>
                <List.Subheader>Doctores</List.Subheader>
                {doctores.map((doctor, index) => (
                  <List.Item
                    key={index}
                    title={doctor}
                    onPress={() => handleSelectDoctor(doctor)}
                  />
                ))}
              </List.Section>
            )}
          </Card>
        ))}

        {/* Modal para mostrar horarios disponibles */}
        <Modal
          visible={visible}
          transparent={true}
          animationType="slide"
          onRequestClose={hideModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Horarios Disponibles</Text>
              <ScrollView style={{ maxHeight: 200 }}>
                {horariosDisponibles.length > 0 ? (
                  horariosDisponibles.map((horario, index) => (
                    <Button key={index} mode="outlined" style={styles.horarioButton}>
                      {horario}
                    </Button>
                  ))
                ) : (
                  <Text>No hay horarios disponibles.</Text>
                )}
              </ScrollView>
              <Pressable onPress={hideModal}>
                <Text style={styles.closeText}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </PaperProvider>
  );
};

export default EspecialidadesComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
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
    backgroundColor: '#fff',
    elevation: 3,
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
    marginBottom: 12,
  },
  horarioButton: {
    marginVertical: 8,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeText: {
    marginTop: 10,
    fontSize: 18,
    color: 'blue',
  },
});
