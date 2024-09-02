import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://tu-api.com', // Reemplaza con la URL de tu API
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
