// src/DataTable.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataTable = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [notificaciones, setNotificaciones] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [especialidadesRes, horariosRes, medicosRes, notificacionesRes, reservasRes, usuariosRes] = await Promise.all([
          axios.get('http://localhost:3306/especialidad'),
          axios.get('http://localhost:3306/horario'),
          axios.get('http://localhost:3306/medico'),
          axios.get('http://localhost:3306/notificacion'),
          axios.get('http://localhost:3306/reserva'),
          axios.get('http://localhost:3306/usuario'),
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
    <div>
      <h1>Especialidades</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>ID Médico</th>
          </tr>
        </thead>
        <tbody>
          {especialidades.map(item => (
            <tr key={item.ID_Especialidad}>
              <td>{item.ID_Especialidad}</td>
              <td>{item.Nom_espe}</td>
              <td>{item.ID_Medic}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Horarios</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha y Hora</th>
            <th>ID Médico</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map(item => (
            <tr key={item.ID_Horario}>
              <td>{item.ID_Horario}</td>
              <td>{item.FechaHora}</td>
              <td>{item.ID_Medic}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Repite el mismo bloque para medicos, notificaciones, reservas y usuarios */}
    </div>
  );
};

export default DataTable;
