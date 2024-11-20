import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const Solicitar = () => {
  const [especialidad, setEspecialidad] = useState('');
  const [especialidadTexto, setEspecialidadTexto] = useState('');  
  const [medicos, setMedicos] = useState([]);
  const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);
  const [horarios, setHorarios] = useState([]); // Para almacenar los horarios del médico seleccionado
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null); // Para almacenar el horario seleccionado
  const [userId, setUserId] = useState(null); // Para almacenar el ID del usuario

  useEffect(() => {
    // Obtener el ID del usuario basado en el rut almacenado en AsyncStorage
    const fetchUserId = async () => {
      try {
        const rut = await AsyncStorage.getItem('rut');
        const token = await AsyncStorage.getItem('token'); // Obtener el token de usuario
        const response = await fetch(`http://190.114.255.204:3000/auth/usuario/${rut}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const userData = await response.json();
        console.log('Datos del usuario:', userData);
        setUserId(userData.ID_User); // Guardar el ID del usuario obtenido
      } catch (error) {
        console.error('Error al obtener el ID del usuario:', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    // Llamada a la API para obtener los médicos y sus especialidades
    const fetchMedicos = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); // Obtenemos el token almacenado
        const response = await fetch('http://190.114.255.204:3000/auth/medicos', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Incluimos el token en el encabezado
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        console.log('Datos de médicos:', data); // Revisamos la estructura de la respuesta
        if (Array.isArray(data)) {
          setMedicos(data); // Asignamos los médicos al estado
        } else {
          console.error('Error al obtener los médicos:', data);
        }
      } catch (error) {
        console.log('Error al obtener los médicos', error);
      }
    };

    fetchMedicos();
  }, []);

  // Función para manejar el cambio de especialidad
  const handleEspecialidadChange = (itemValue) => {
    setEspecialidad(itemValue);
    setEspecialidadTexto(itemValue); // Guardamos el nombre de la especialidad
    setMedicoSeleccionado(null); // Reiniciar médico seleccionado cuando cambie la especialidad
    setHorarios([]); // Limpiar los horarios
    setHorarioSeleccionado(null); // Reiniciar el horario seleccionado
  };

  // Función para manejar el médico seleccionado
  const handleMedicoSeleccionado = async (medico) => {
    setMedicoSeleccionado(medico); // Guardamos el médico seleccionado
    setHorarioSeleccionado(null); 
    console.log('Médico seleccionado:', medico);

    // Llamada a la API para obtener los horarios del médico seleccionado
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`http://190.114.255.204:3000/auth/reserva/${medico.ID_Medic}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const horariosData = await response.json();
      console.log('Horarios:', horariosData);

      if (Array.isArray(horariosData)) {
        setHorarios(horariosData); // Asignamos los horarios obtenidos
      } else {
        console.error('Error al obtener los horarios:', horariosData);
      }
    } catch (error) {
      console.error('Error al obtener los horarios:', error);
    }
  };

  // Función para formatear la fecha al formato MySQL
  const formatDateToMySQL = (date) => {
    const d = new Date(date);
    const formattedDate = [
      d.getFullYear(),
      ('0' + (d.getMonth() + 1)).slice(-2),  // Mes
      ('0' + d.getDate()).slice(-2),          // Día
    ].join('-') + ' ' + [
      ('0' + d.getHours()).slice(-2),         // Horas
      ('0' + d.getMinutes()).slice(-2),       // Minutos
      ('0' + d.getSeconds()).slice(-2)        // Segundos
    ].join(':');
    return formattedDate;
  };

  // Función para manejar el horario seleccionado
  const handleHorarioSeleccionado = (horario) => {
    setHorarioSeleccionado(horario);
    console.log('Horario seleccionado:', horario);
  };

  // Función para realizar la reserva
  const handleReserva = async () => {
    if (!medicoSeleccionado || !horarioSeleccionado) {
      alert('Debes seleccionar un médico y un horario');
      return;
    }

    if (!userId) {
      alert('No se pudo obtener el ID del usuario');
      return;
    }

    const fechaCreacion = formatDateToMySQL(new Date());  // Formatear la fecha

    // Verificar los datos antes de la solicitud
  console.log("Datos para la reserva:", {
    ID_User: userId,
    ID_Horario: horarioSeleccionado.ID_Horario,
    FechaCreacion: new Date().toISOString(),
    Cancelacion: false
  });

    // Enviar la reserva al backend
    try {
      const token = await AsyncStorage.getItem('token');
//      const ID_User = await AsyncStorage.getItem('rut'); // ID del usuario logueado
      const response = await fetch('http://190.114.255.204:3000/auth/reservarhora', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID_User: userId, // Usar el ID del usuario
          ID_Horario: horarioSeleccionado.ID_Horario, // ID del horario seleccionado
          FechaCreacion: fechaCreacion,
//          FechaCreacion: new Date().toISOString(),
          Cancelacion: false,
        }),
      });

      const data = await response.json();
      console.log("Respuesta del backend:", data);
      Alert.alert('Reserva creada exitosamente');
    } catch (error) {
      console.error('Error al crear la reserva', error);
      Alert.alert('Error al crear la reserva.');
    }
  };

  // Filtramos los médicos según la especialidad seleccionada
  const medicosFiltrados = especialidadTexto
  ? medicos.filter(medico => medico.Nom_espe === especialidadTexto)
  : [];  

  return (
    <View style={styles.container}>
      
      {/* Sección superior (2/6) */}
      <View style={styles.topContainer}>
        <Text style={styles.title}>Solicitar horas médicas</Text>
        <Text style={styles.subtitle}>Selecciona la especialidad de nuestros profesionales</Text>
      </View>

      {/* Sección inferior (4/6) */}
      <View style={styles.bottomContainer}>
        {/* Selector de especialidades */}
        <Picker
          selectedValue={especialidad}
          style={styles.picker}
          onValueChange={handleEspecialidadChange}
        >
          <Picker.Item label="Seleccione una especialidad" value="" />
          <Picker.Item label="Cardiologia" value="Cardiologia" />
          <Picker.Item label="Neurologia" value="Neurologia" />
          <Picker.Item label="Dermatologia" value="Dermatologia" />
          <Picker.Item label="Pediatria" value="Pediatria" />
          <Picker.Item label="Oftalmologia" value="Oftalmologia" />
          <Picker.Item label="Ginecologia" value="Ginecologia" />
          <Picker.Item label="Psiquiatria" value="Psiquiatria" />
          <Picker.Item label="Oncologia" value="Oncologia" />
          <Picker.Item label="Urologia" value="Urologia" />
          <Picker.Item label="Endocrinologia" value="Endocrinologia" />
          <Picker.Item label="Neumologia" value="Neumologia" />
        </Picker>

        {especialidadTexto ? (
          <Text style={styles.selectedText}>Especialidad seleccionada: {especialidadTexto}</Text>
        ) : (
          <Text style={styles.selectedText}>No ha seleccionado ninguna especialidad</Text>
        )}

        {/* Lista de médicos filtrados */}
        {especialidadTexto && medicosFiltrados.length > 0 ? (
          <FlatList
            data={medicosFiltrados}
            keyExtractor={(item) => item.ID_Medic.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleMedicoSeleccionado(item)} style={styles.medicoItem}>
                <Text style={styles.medicoText}>{item.Nom_medic} {item.Apelli_medic}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.selectedText}>No hay médicos disponibles para esta especialidad.</Text>
        )}

        {/* Lista de horarios del médico seleccionado */}
        {medicoSeleccionado && horarios.length > 0 ? (
          <FlatList
            data={horarios}
            keyExtractor={(item) => item.ID_Horario.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleHorarioSeleccionado(item)} style={styles.horarioItem}>
                <Text style={styles.horarioText}>{new Date(item.FechaHora).toLocaleString()}</Text>
              </TouchableOpacity>
            )}
          />
        ) : medicoSeleccionado ? (
          <Text style={styles.selectedText}>No hay horarios disponibles para este médico.</Text>
        ) : null}

        {/* Mostrar detalles seleccionados */}
        {medicoSeleccionado && horarioSeleccionado ? (
          <View style={styles.selectedDetailsContainer}>
            <Text style={styles.selectedDetailsText}>Médico seleccionado: {medicoSeleccionado.Nom_medic} {medicoSeleccionado.Apelli_medic}</Text>
            <Text style={styles.selectedDetailsText}>Fecha seleccionada: {new Date(horarioSeleccionado.FechaHora).toLocaleString()}</Text>
          </View>
        ) : medicoSeleccionado && horarios.length === 0 ? (
          <View style={styles.selectedDetailsContainer}>
            <Text style={styles.selectedDetailsText}>Médico seleccionado: {medicoSeleccionado.Nom_medic} {medicoSeleccionado.Apelli_medic}</Text>
            <Text style={styles.selectedDetailsText}>Este médico no tiene horarios disponibles</Text>
          </View>
        ) : null}

        {/* Botón para hacer la reserva */}
        {medicoSeleccionado && horarioSeleccionado && (
          <Button title="Solicitar reserva" onPress={handleReserva} />
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
  picker: {
    height: 50,
    width: 250,
    marginBottom: 20,
  },
  selectedText: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
  },
  medicoItem: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  medicoText: {
    fontSize: 16,
    fontFamily: 'System',
  },
  horarioItem: {
    padding: 10,
    backgroundColor: '#d0f0c0',
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  horarioText: {
    fontSize: 16,
    fontFamily: 'System',
  },
  selectedText: {
    fontSize: 16,
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'System',
  },
  selectedDetailsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e0f7fa',
    borderRadius: 5,
    fontFamily: 'System',
  },
  selectedDetailsText: {
    fontSize: 16,
    color: '#00796b',
    marginBottom: 5,
    fontFamily: 'System',
  },
});

export default Solicitar;