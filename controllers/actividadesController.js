const db = require('../db');

/**
 * Obtiene todos
 * (Traducción a async/await)
 */
exports.getTodos = async (req, res, next) => {
    try {
        // 'await' espera la respuesta de la base de datos
        const [results] = await db.query('SELECT * FROM actividades');
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
        const [results] = await db.query('SELECT * FROM actividades WHERE id=?', [id]);
        
        if (results.length === 0) {
            return res.status(404).json({
                mensaje: 'Actividad no encontrada'
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
    const { nombre, costo, turno } = req.body;
    
    try {
        const [result] = await db.query(
            'INSERT INTO actividades (nombre, costo, turno) VALUES(?,?,?)', 
            [nombre, costo, turno]
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
    const { nombre, costo, turno } = req.body;
    
    try {
        await db.query(
            'UPDATE actividades SET nombre=?, costo=?, turno=? WHERE id=?',
            [nombre, costo, turno, id]
        );
        
        res.json({ mensaje: 'Actividad actualizada' });
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
        await db.query('DELETE FROM actividades WHERE id=?', [id]);
        
        res.json({ mensaje: 'Actividad eliminada' });
    } catch (err) {
        next(err);
    }
}