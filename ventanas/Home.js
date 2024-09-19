import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Home = () => {
  const navigation = useNavigation();

  return (
    <View>

      <TouchableOpacity 
      style = {{
        backgroundColor: "green",
        padding: 10,
        marginTop: 100,
        width: "50%",
        alignSelf: "center",
        borderRadius: 10,
      }}
      onPress={() => navigation.navigate('Citas medicas agendadas')}>
        <Text
          style = {{
            fontSize: 15,
            textAlign: "center",
            color: "white",
          }}
        >Ver citas medicas agendadas</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      style = {{
        backgroundColor: "green",
        padding: 10,
        marginTop: 100,
        width: "50%",
        alignSelf: "center",
        borderRadius: 10,
      }}
      onPress={() => navigation.navigate('Reprogramar horas agendadas')}>
        <Text
          style = {{
            fontSize: 15,
            textAlign: "center",
            color: "white",
          }}
        >Reprogramar horas agendadas</Text>
      </TouchableOpacity>

    </View>
  );
}

export default Home;