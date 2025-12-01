const db = require('../db');

/**
 * Obtiene todos
 * (Traducción a async/await)
 */
exports.getTodos = async (req, res, next) => {
    try {
        // 'await' espera la respuesta de la base de datos
        const [results] = await db.query('SELECT * FROM usuarios');
        // Si todo va bien, envía la respuesta
        res.json(results);
    } catch (err) {
        // Si hay un error, lo pasa al manejador de errores de Express
        next(err);
    }
};

/**
 * Obtiene uno por ID
 * (Traducción a async/await)
 */
exports.getPorId = async (req, res, next) => {
    const id = req.params.id;
    try {
        const [results] = await db.query('SELECT * FROM usuarios WHERE id=?', [id]);
        
        if (results.length === 0) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }
        
        res.json(results[0]);
    } catch (err) {
        next(err);
    }
}

/**
 * Insertar uno
 * (Traducción a async/await)
 */
exports.insertar = async (req, res, next) => {
    //const { usuario, contrasena, rol, idSocio } = req.body;
    
    try {
        const hash = await require('bcrypt').hash(contrasena, 10);
        const [result] = await db.query(
            'INSERT INTO usuarios (usuario, contrasena, rol, idSocio) VALUES(?,?,?,?)', 
            [usuario, hash, rol, idSocio]
        );
        
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        next(err);
    }
};

/**
 * Actualizar
 * (Traducción a async/await)
 */
exports.modificar = async (req, res, next) => {
    const id = req.params.id;
    //const { usuario, contrasena, rol, idSocio } = req.body;
    
    try {
        const hash = await require('bcrypt').hash(contrasena, 10);
        await db.query(
            'UPDATE usuarios SET usuario=?, contrasena=?, rol=?, idSocio=? WHERE id=?',
            [usuario, hash, rol, idSocio, id]
        );
        
        res.json({ mensaje: 'Usuario actualizado' });
    } catch (err) {
        next(err);
    }
};

/**
 * Eliminar
 * (Traducción a async/await)
 */
exports.eliminar = async (req, res, next) => {
    const id = req.params.id;
    
    try {
        await db.query('DELETE FROM usuarios WHERE id=?', [id]);
        
        res.json({ mensaje: 'Usuario eliminado' });
    } catch (err) {
        next(err);
    }
}