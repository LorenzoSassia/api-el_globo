const db = require('../db');

/**
 * Obtiene todos los casilleros
 * (Traducción a async/await)
 */
exports.getTodos = async (req, res, next) => {
    try {
        const [results] = await db.query('SELECT * FROM casilleros');
        res.json(results);
    } catch (err) {
        // Pasa el error al manejador de errores de Express
        next(err);
    }
};

/**
 * Obtiene un Casillero por ID
 * (Traducción a async/await)
 */
exports.getPorId = async (req, res, next) => {
    const id = req.params.id;
    try {
        const [results] = await db.query('SELECT * FROM casilleros WHERE id=?', [id]);
        
        if (results.length === 0) {
            return res.status(404).json({
                mensaje: 'Casillero no encontrado'
            });
        }
        res.json(results[0]);
    } catch (err) {
        next(err);
    }
}

/**
 * Insertar un Casillero
 * (Traducción a async/await)
 */
exports.insertar = async (req, res, next) => {
    // nro_casillero y monto_mensual deben venir en snake_case desde el body
    // o ser convertidos si el frontend los envía en camelCase.
    // Asumiremos que el body ya los manda en snake_case.
    const { nro_casillero, estado, monto_mensual } = req.body;
    
    try {
        const [result] = await db.query(
            'INSERT INTO casilleros (nro_casillero, estado, monto_mensual) VALUES(?,?,?)',
            [nro_casillero, estado, monto_mensual]
        );
        
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        next(err);
    }
};

/**
 * Actualizar Casillero
 * (Traducción a async/await)
 */
exports.modificar = async (req, res, next) => {
    const id = req.params.id;
    const { nro_casillero, estado, monto_mensual } = req.body;
    
    try {
        await db.query(
            'UPDATE casilleros SET nro_casillero=?, estado=?, monto_mensual=? WHERE id=?',
            [nro_casillero, estado, monto_mensual, id]
        );
        
        res.json({ mensaje: 'Casillero actualizado' });
    } catch (err) {
        next(err);
    }
};

/**
 * Eliminar Casillero
 * (Traducción a async/await)
 */
exports.eliminar = async (req, res, next) => {
    const id = req.params.id;
    
    try {
        await db.query('DELETE FROM casilleros WHERE id=?', [id]);
        
        res.json({ mensaje: 'Casillero eliminado' });
    } catch (err) {
        next(err);
    }
}