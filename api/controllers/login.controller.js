//import bcrypt from 'bcrypt';
const pool = require('../db_config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.InicioSesion = async (req, res) => {
    const { rut, Contraseña } = req.body;
    try{
        const connection = await pool.getConnection();
        const rows = await connection.query('SELECT * FROM usuario WHERE rut = ?', [rut]);

        if (rows.length == 0){
            return res.status(400).json({message: 'Usuario no encontrado'})
        }
        
        const user = rows[0];

        const isPasswordValid = await bcrypt.compare(Contraseña, user.Contraseña);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { rut: user.rut, id: user.id }, 
            process.env.SECRET_KEY, 
            { expiresIn: '1h' }
        );
  
        res.status(200).json({ 
          message: 'Inicio de sesión exitoso',
          token: token,
          rut: user.rut
         });
        connection.release();

    }catch{
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

