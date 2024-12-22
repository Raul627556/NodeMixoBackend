// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return res.status(401).json({ message: 'Acceso no autorizado' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Añadir la información del usuario decodificado a la solicitud
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token no válido' });
    }
};

module.exports = authMiddleware;