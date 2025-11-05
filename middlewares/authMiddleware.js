const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ mensaje: 'Token requerido' });

    // Separar "Bearer" del token
    /*const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ mensaje: 'Formato de token inválido. Se esperaba "Bearer [token]".' });
    }
    const token = tokenParts[1];
    */
    jwt.verify(token, 'secreto123', (err, decoded) => {
        if (err) return res.status(401).json({ mensaje: 'Token inválido'});
        req.usuario = decoded; 
        next();
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
