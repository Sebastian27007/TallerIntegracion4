const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    //Se establece una variable que guarde la clave secreta, para poder mejorar la seguridad de los tokens de la api
    const key = process.env.SECRET_KEY;
    if (!token) {
        return res.status(401).json({ message: 'Token faltante' });
    }

    jwt.verify(token, key, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido o expirado' });
        }

        req.user = user;
        next();
    });
};
