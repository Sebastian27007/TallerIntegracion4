import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { getItems, addItem, deleteItem } from '../api/items';

const ItemsScreen = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddItem = async () => {
    try {
      const newItem = { text: 'New Item', done: false };
      await addItem(newItem);
      fetchItems(); // Refresca la lista
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(id);
      fetchItems(); // Refresca la lista
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Button title="Add Item" onPress={handleAddItem} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.text}</Text>
            <Button title="Delete" onPress={() => handleDeleteItem(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default ItemsScreen;
