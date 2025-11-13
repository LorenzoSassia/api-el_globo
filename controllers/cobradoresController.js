const db = require('../db');

/**
 * Obtiene todos
 * (Traducción a async/await)
 */
exports.getTodos = async (req, res, next) => {
    try {
        const [results] = await db.query('SELECT * FROM cobradores');
        res.json(results);
    } catch (err) {
        // Pasa el error al manejador de errores de Express
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
        const [results] = await db.query('SELECT * FROM cobradores WHERE id=?', [id]);
        
        if (results.length === 0) {
            return res.status(404).json({
                mensaje: 'Cobrador no encontrado' // Corregido 'cobrador'
            });
        }
        res.json(results[0]);
    } catch (err) {
        next(err);
    }
}

/**
 * Insertar uno
 * (Traducción a async/await y corrección de campos)
 */
exports.insertar = async (req, res, next) => {
    // La consulta original pedía 'nombre' y 'zona'
    const { nombre, zona } = req.body; 
    
    try {
        const [result] = await db.query(
            'INSERT INTO cobradores (nombre, zona) VALUES(?,?)', 
            [nombre, zona]
        );
        
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        next(err);
    }
};

/**
 * Actualizar
 * (Traducción a async/await y corrección de campos)
 */
exports.modificar = async (req, res, next) => {
    const id = req.params.id;
    // La consulta original pedía 'nombre' y 'zona'
    const { nombre, zona } = req.body; 
    
    try {
        await db.query(
            'UPDATE cobradores SET nombre=?, zona=? WHERE id=?',
            [nombre, zona, id] // La consulta original tenía mal los parámetros
        );
        
        res.json({ mensaje: 'Cobrador actualizado' }); // Corregido 'cobrador'
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
        await db.query('DELETE FROM cobradores WHERE id=?', [id]);
        
        res.json({ mensaje: 'Cobrador eliminado' }); // Corregido 'cobrador'
    } catch (err) {
        next(err);
    }
}