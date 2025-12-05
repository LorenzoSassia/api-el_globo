const db = require('../db');

/**
 * Obtiene todos
 * (Traducción a async/await)
 */
exports.getTodos = async (req, res, next) => {
    try {
        const [results] = await db.query('SELECT * FROM vista_cobranzas');
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
        const [results] = await db.query('SELECT * FROM vista_cobranzas WHERE id=?', [id]);
        
        if (results.length === 0) {
            return res.status(404).json({
                mensaje: 'Cobranza no encontrada'
            });
        }
        res.json(results[0]);
    } catch (err) {
        next(err);
    }
}