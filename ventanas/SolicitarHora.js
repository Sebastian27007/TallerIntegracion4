import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import DateTimePicker from '@react-native-community/datetimepicker'; 

const Solicitar = () => {
  const [especialidad, setEspecialidad] = useState('');
  const [especialidadTexto, setEspecialidadTexto] = useState(''); 
  const [fecha, setFecha] = useState(new Date()); 
  const [mostrarFecha, setMostrarFecha] = useState(false); 

  const onChangeFecha = (event, selectedDate) => {
    if (selectedDate) {  
      setFecha(selectedDate);
    }
    setMostrarFecha(false); 
  };

  const handleEspecialidadChange = (itemValue, itemIndex) => {
    setEspecialidad(itemValue);
    const selectedItem = itemIndex === 0 ? "" : itemValue;
    setEspecialidadTexto(selectedItem);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Solicitar horas médicas</Text>

      {/* Selector de especialidades */}
      <Picker
        selectedValue={especialidad}
        style={styles.picker}
        onValueChange={handleEspecialidadChange}
      >
        <Picker.Item label="Seleccione una especialidad" value="" />
        <Picker.Item label="Medicina Interna" value="Medicina Interna" />
        <Picker.Item label="Dermatología" value="Dermatología" />
        <Picker.Item label="Pediatría" value="Pediatría" />
        <Picker.Item label="Cardiología" value="Cardiología" />
        <Picker.Item label="Ginecología" value="Ginecología" />
        <Picker.Item label="Oftalmología" value="Oftalmología" />
      </Picker>

      {especialidadTexto ? (
        <Text style={styles.selectedText}>Especialidad seleccionada: {especialidadTexto}</Text>
      ) : (
        <Text style={styles.selectedText}>No ha seleccionado ninguna especialidad</Text>
      )}

      <View style={styles.dateContainer}>
        <Button title="Seleccionar fecha" onPress={() => setMostrarFecha(true)} />
        <Text style={styles.selectedText}>Fecha seleccionada: {fecha.toLocaleDateString()}</Text>
      </View>

      {mostrarFecha && (
        <DateTimePicker
          value={fecha}
          mode="date"
          display="default"
          onChange={onChangeFecha}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  text: {
    fontSize: 20,
    color: '#333',
    marginBottom: 20,
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
  },
  dateContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
});

export default Solicitar;