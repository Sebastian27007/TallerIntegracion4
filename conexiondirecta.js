import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import axios from 'axios';

export default function App() {
  const [especialidades, setEspecialidades] = React.useState([]);
  const [horarios, setHorarios] = React.useState([]);
  const [medicos, setMedicos] = React.useState([]);
  const [notificaciones, setNotificaciones] = React.useState([]);
  const [reservas, setReservas] = React.useState([]);
  const [usuarios, setUsuarios] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [especialidadesRes, horariosRes, medicosRes, notificacionesRes, reservasRes, usuariosRes] = await Promise.all([
          axios.get('http://190.114.255.204:3306/especialidad'),
          axios.get('http://190.114.255.204:3306/horario'),
          axios.get('http://190.114.255.204:3306/medico'),
          axios.get('http://190.114.255.204:3306/notificacion'),
          axios.get('http://190.114.255.204:3306/reserva'),
          axios.get('http://190.114.255.204:3306/usuario'),
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
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>ID</DataTable.Title>
              <DataTable.Title>Nombre Especialidad</DataTable.Title>
            </DataTable.Header>
            {especialidades.map(item => (
              <DataTable.Row key={item.ID_Especialidad}>
                <DataTable.Cell>{item.ID_Especialidad}</DataTable.Cell>
                <DataTable.Cell>{item.Nom_espe}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>ID</DataTable.Title>
              <DataTable.Title>Fecha y Hora</DataTable.Title>
              <DataTable.Title>ID Médico</DataTable.Title>
            </DataTable.Header>
            {horarios.map(item => (
              <DataTable.Row key={item.ID_Horario}>
                <DataTable.Cell>{item.ID_Horario}</DataTable.Cell>
                <DataTable.Cell>{item.FechaHora}</DataTable.Cell>
                <DataTable.Cell>{item.ID_Medic}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>ID</DataTable.Title>
              <DataTable.Title>Nombre Médico</DataTable.Title>
            </DataTable.Header>
            {medicos.map(item => (
              <DataTable.Row key={item.ID_Medic}>
                <DataTable.Cell>{item.ID_Medic}</DataTable.Cell>
                <DataTable.Cell>{item.Nombre}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>

          {/* Repite lo mismo para notificaciones, reservas y usuarios */}
        </View>
      </ScrollView>
    </PaperProvider>
  );
}
