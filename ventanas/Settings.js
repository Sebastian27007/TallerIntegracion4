import React, { useState } from 'react';
import { View, Text, Button, TextInput, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Settings = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.uri);
    }
  };

  const updateCredentials = () => {
    console.log('Actualizando credenciales:', { name, rut, password });
  };

  return (
    <ImageBackground 
      source={require('../assets/background.jpg')} // Asegúrate de que la ruta es correcta.
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require('../assets/perfil.jpg') // Asegúrate de que la ruta es correcta.
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Configuración de la cuenta</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="RUT"
          value={rut}
          onChangeText={setRut}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Actualizar Credenciales" onPress={updateCredentials} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semitransparente para los elementos.
  },
  text: {
    fontSize: 20,
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 10,
  },
});

export default Settings;
