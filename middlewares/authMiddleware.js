const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    // 1. Obtener el header completo (ej: "Bearer <token...>")
    const tokenHeader = req.headers['authorization']; 
    if (!tokenHeader) {
        return res.status(401).json({ mensaje: 'Token requerido' });
    }

    // 2. Separar la palabra "Bearer" del token
    const tokenParts = tokenHeader.split(' '); // Divide en ["Bearer", "<token...>"]
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ mensaje: 'Formato de token inválido. Se esperaba "Bearer [token]".' });
    }
    
    // 3. Obtener solo el token real (la segunda parte)
    const token = tokenParts[1];

    // 4. Verificar SOLO el token (no el header completo)
    jwt.verify(token, 'secreto123', (err, decoded) => {
        if (err) {
            // Si la firma 'secreto123' no coincide o el token expiró, dará error
            return res.status(401).json({ mensaje: 'Token inválido'});
        }
        req.usuario = decoded; // Adjunta los datos del usuario (id, rol) al objeto req
        next(); // ¡Permite el paso al siguiente controlador!
    });
};


const requerirRol = (rol) => {
    return (req, res, next) => {
        if ( req.usuario.rol !== rol ) return res.status(403).json({ mensaje: 'Acceso denegado' });
        next();
    };
};

const requerirCualquierRol = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.usuario.rol)) {
            return res.status(403).json({ mensaje: 'Acceso denegado: se requiere alguno de los siguientes roles: ' + roles.join(', ')});
        }
        next();
    };
};

module.exports = {verificarToken, requerirRol, requerirCualquierRol};