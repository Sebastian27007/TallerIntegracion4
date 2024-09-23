import React, { useEffect, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import axios from 'axios';

const Tablas = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [notificaciones, setNotificaciones] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [especialidadesRes, horariosRes, medicosRes, notificacionesRes, reservasRes, usuariosRes] = await Promise.all([
          axios.get('http://localhost:3306/especialidad'),
          axios.get('http://localhost:3306/horario'),
          axios.get('http://localhost:3306/medico'),
          axios.get('http://localhost:3306/notificacion'),
          axios.get('http://localhost:3306/reserva'),
          axios.get('http://localhost:3306/usuario'),
        ]);

        setEspecialidades(especialidadesRes.data);
        setHorarios(horariosRes.data);
        setMedicos(medicosRes.data);
        setNotificaciones(notificacionesRes.data);
        setReservas(reservasRes.data);
        setUsuarios(usuariosRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <PaperProvider>
      <ScrollView>
        <View>

          {/* Encabezado y tabla de Especialidades */}
          <Text style={styles.tableTitle}>Especialidades</Text>
          <DataTable style={styles.especialidadesTable}>
            <DataTable.Header>
              <DataTable.Title textStyle={styles.tableHeaderText}>ID</DataTable.Title>
              <DataTable.Title textStyle={styles.tableHeaderText}>Nombre Especialidad</DataTable.Title>
            </DataTable.Header>
            {especialidades.map(item => (
              <DataTable.Row key={item.ID_Especialidad}>
                <DataTable.Cell textStyle={styles.tableCellText}>{item.ID_Especialidad}</DataTable.Cell>
                <DataTable.Cell textStyle={styles.tableCellText}>{item.Nom_espe}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>

          {/* Encabezado y tabla de Horarios */}
          <Text style={styles.tableTitle}>Horarios</Text>
          <DataTable style={styles.horariosTable}>
            <DataTable.Header>
              <DataTable.Title textStyle={styles.tableHeaderText}>ID</DataTable.Title>
              <DataTable.Title textStyle={styles.tableHeaderText}>Fecha y Hora</DataTable.Title>
            </DataTable.Header>
            {horarios.map(item => (
              <DataTable.Row key={item.ID_Horario}>
                <DataTable.Cell textStyle={styles.tableCellText}>{item.ID_Horario}</DataTable.Cell>
                <DataTable.Cell textStyle={styles.tableCellText}>{item.FechaHora}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>

          {/* Encabezado y tabla de Médicos */}
          <Text style={styles.tableTitle}>Médicos</Text>
          <DataTable style={styles.medicosTable}>
            <DataTable.Header>
              <DataTable.Title textStyle={styles.tableHeaderText}>ID</DataTable.Title>
              <DataTable.Title textStyle={styles.tableHeaderText}>Nombre Médico</DataTable.Title>
            </DataTable.Header>
            {medicos.map(item => (
              <DataTable.Row key={item.ID_Medic}>
                <DataTable.Cell textStyle={styles.tableCellText}>{item.ID_Medic}</DataTable.Cell>
                <DataTable.Cell textStyle={styles.tableCellText}>{item.Nom_medic}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>

          {/* Encabezado y tabla de Notificaciones */}
          <Text style={styles.tableTitle}>Notificaciones</Text>
          <DataTable style={styles.notificacionesTable}>
            <DataTable.Header>
              <DataTable.Title textStyle={styles.tableHeaderText}>ID</DataTable.Title>
              <DataTable.Title textStyle={styles.tableHeaderText}>Notificación</DataTable.Title>
            </DataTable.Header>
            {notificaciones.map(item => (
              <DataTable.Row key={item.ID_Notificacion}>
                <DataTable.Cell textStyle={styles.tableCellText}>{item.ID_Notificacion}</DataTable.Cell>
                <DataTable.Cell textStyle={styles.tableCellText}>{item.Mensaje}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>

          {/* Encabezado y tabla de Reservas */}
          <Text style={styles.tableTitle}>Reservas</Text>
          <DataTable style={styles.reservasTable}>
            <DataTable.Header>
              <DataTable.Title textStyle={styles.tableHeaderText}>ID</DataTable.Title>
              <DataTable.Title textStyle={styles.tableHeaderText}>ID Usuario</DataTable.Title>
            </DataTable.Header>
            {reservas.map(item => (
              <DataTable.Row key={item.ID_Reserva}>
                <DataTable.Cell textStyle={styles.tableCellText}>{item.ID_Reserva}</DataTable.Cell>
                <DataTable.Cell textStyle={styles.tableCellText}>{item.ID_Usuario}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>

          {/* Encabezado y tabla de Usuarios */}
          <Text style={styles.tableTitle}>Usuarios</Text>
          <DataTable style={styles.usuariosTable}>
            <DataTable.Header>
              <DataTable.Title textStyle={styles.tableHeaderText}>ID</DataTable.Title>
              <DataTable.Title textStyle={styles.tableHeaderText}>Nombre Usuario</DataTable.Title>
            </DataTable.Header>
            {usuarios.map(item => (
              <DataTable.Row key={item.ID_Usuario}>
                <DataTable.Cell textStyle={styles.tableCellText}>{item.ID_Usuario}</DataTable.Cell>
                <DataTable.Cell textStyle={styles.tableCellText}>{item.Nombre}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>

        </View>
      </ScrollView>
    </PaperProvider>
  );
};

export default Tablas;

const styles = StyleSheet.create({
  tableTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  especialidadesTable: {
    backgroundColor: '#FFEBEE',
  },
  horariosTable: {
    backgroundColor: '#E3F2FD',
  },
  medicosTable: {
    backgroundColor: '#E8F5E9',
  },
  notificacionesTable: {
    backgroundColor: '#FFF3E0',
  },
  reservasTable: {
    backgroundColor: '#F3E5F5',
  },
  usuariosTable: {
    backgroundColor: '#E0F7FA',
  },
  tableHeaderText: {
    color: '#424242',
    fontWeight: 'bold',
  },
  tableCellText: {
    color: '#424242',
  },
});
