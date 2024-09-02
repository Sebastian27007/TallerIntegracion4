import apiClient from './apiClient';

export const getItems = async () => {
  try {
    const response = await apiClient.get('/items');
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const addItem = async (item) => {
  try {
    const response = await apiClient.post('/items', item);
    return response.data;
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await apiClient.delete(`/items/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};
