import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TextInput } from 'react-native';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [idToUpdate, setIdToUpdate] = useState(null);

  const API_URL = 'https://tu-api.com/users'; 

  // GET: Obtener todos los usuarios
  const fetchUsers = () => {
    axios.get(API_URL)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log('Error al obtener los datos: ', error);
      });
  };

  // POST: Crear un nuevo usuario
  const addUser = () => {
    axios.post(API_URL, { name })
      .then((response) => {
        setUsers([...users, response.data]);
        setName('');
      })
      .catch((error) => {
        console.log('Error al crear el usuario: ', error);
      });
  };

  // PUT: Actualizar un usuario existente
  const updateUser = () => {
    if (idToUpdate) {
      axios.put(`${API_URL}/${idToUpdate}`, { name })
        .then((response) => {
          const updatedUsers = users.map(user =>
            user.id === idToUpdate ? response.data : user
          );
          setUsers(updatedUsers);
          setName('');
          setIdToUpdate(null);
        })
        .catch((error) => {
          console.log('Error al actualizar el usuario: ', error);
        });
    }
  };

  // DELETE: Eliminar un usuario
  const deleteUser = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch((error) => {
        console.log('Error al eliminar el usuario: ', error);
      });
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View>
      <TextInput
        placeholder="Nombre del usuario"
        value={name}
        onChangeText={(text) => setName(text)}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <Button
        title={idToUpdate ? "Actualizar Usuario" : "Agregar Usuario"}
        onPress={idToUpdate ? updateUser : addUser}
      />

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
            <Text>{item.name}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Button title="Editar" onPress={() => {
                setName(item.name);
                setIdToUpdate(item.id);
              }} />
              <Button title="Eliminar" onPress={() => deleteUser(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default App;
