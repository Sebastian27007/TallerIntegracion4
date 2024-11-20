import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: '¿Cómo puedo actualizar mis credenciales?',
      answer: 'Puedes actualizar tus credenciales en el apartado de configuración, seleccionando "Actualizar Credenciales".',
    },
    {
      question: '¿Cómo recupero mi contraseña?',
      answer: 'Haz clic en "Olvidé mi contraseña" en la pantalla de inicio de sesión y sigue las instrucciones.',
    },
    {
      question: '¿Cómo contacto con soporte?',
      answer: 'Puedes contactar con soporte enviando un mensaje a soporte@tudominio.com.',
    },
    // Agrega más preguntas y respuestas aquí
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => toggleExpand(index)}>
        <Text style={styles.question}>{item.question}</Text>
      </TouchableOpacity>
      {expandedIndex === index && <Text style={styles.answer}>{item.answer}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preguntas Frecuentes</Text>
      <FlatList
        data={faqs}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  answer: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});

export default FAQ;
