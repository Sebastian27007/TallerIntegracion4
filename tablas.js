import React, { useEffect, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { ScrollView, View, Text, StyleSheet, Picker } from 'react-native';
import { DataTable } from 'react-native-paper';
import axios from 'axios';

const TablasComponent = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState(null);
  const [filteredMedicos, setFilteredMedicos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [especialidadesRes, medicosRes] = await Promise.all([
          axios.get('http://localhost:3000/especialidad'),
          axios.get('http://localhost:3000/medico'),
        ]);

        setEspecialidades(especialidadesRes.data);
        setMedicos(medicosRes.data);
        setFilteredMedicos(medicosRes.data); // Muestra todos los médicos inicialmente
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filtra médicos según la especialidad seleccionada
  useEffect(() => {
    if (selectedEspecialidad) {
      console.log('Especialidad seleccionada (ID):', selectedEspecialidad);
      const filtered = medicos.filter(
        (medico) => medico.ID_Especialidad === selectedEspecialidad
      );
      setFilteredMedicos(filtered);
      console.log('Médicos filtrados:', filtered);
    } else {
      setFilteredMedicos(medicos); // Mostrar todos los médicos si no hay filtro
    }
  }, [selectedEspecialidad, medicos]);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.tableTitle}>Seleccionar Especialidad</Text>
          <Picker
            selectedValue={selectedEspecialidad}
            onValueChange={(itemValue) => setSelectedEspecialidad(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Todas las especialidades" value={null} />
            {especialidades.map((espe) => (
              <Picker.Item key={espe.ID_Especialidad} label={espe.Nom_espe} value={espe.ID_Especialidad} />
            ))}
          </Picker>

          {/* Tabla de Médicos filtrados */}
          <Text style={styles.tableTitle}>Médicos</Text>
          <DataTable style={styles.medicosTable}>
            <DataTable.Header>
              <DataTable.Title textStyle={styles.tableHeaderText}>ID</DataTable.Title>
              <DataTable.Title textStyle={styles.tableHeaderText}>Nombre Médico</DataTable.Title>
              <DataTable.Title textStyle={styles.tableHeaderText}>Apellido Médico</DataTable.Title>
            </DataTable.Header>
            {filteredMedicos.length === 0 ? (
              <DataTable.Row>
                <DataTable.Cell textStyle={styles.tableCellText} colSpan={3}>
                  No hay médicos disponibles.
                </DataTable.Cell>
              </DataTable.Row>
            ) : (
              filteredMedicos.map((medico) => (
                <DataTable.Row key={medico.ID_Medic}>
                  <DataTable.Cell textStyle={styles.tableCellText}>{medico.ID_Medic}</DataTable.Cell>
                  <DataTable.Cell textStyle={styles.tableCellText}>{medico.Nom_medic}</DataTable.Cell>
                  <DataTable.Cell textStyle={styles.tableCellText}>{medico.Apelli_medic}</DataTable.Cell>
                </DataTable.Row>
              ))
            )}
          </DataTable>
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

export default TablasComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  tableTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#424242',
  },
  medicosTable: {
    backgroundColor: '#E8F5E9',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
  },
  tableHeaderText: {
    color: '#424242',
    fontWeight: 'bold',
  },
  tableCellText: {
    color: '#424242',
  },
});
