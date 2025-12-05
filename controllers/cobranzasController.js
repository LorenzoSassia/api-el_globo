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

/**
 * Insertar uno
 * (Traducción a async/await)
 */
exports.insertar = async (req, res, next) => {
    const { fecha_emision, mes, monto, estado, recargo, descuento, socios_id, cobradores_id } = req.body;
    
    try {
        const [result] = await db.query(
            'INSERT INTO cobranzas (fecha_emision, mes, monto, estado, recargo, descuento, socios_id, cobradores_id) VALUES(?,?,?,?,?,?,?,?)', 
            [fecha_emision, mes, monto, estado, recargo, descuento, socios_id, cobradores_id]
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
    const { fecha_emision, mes, monto, estado, recargo, descuento, socios_id, cobradores_id } = req.body;
    
    try {
        await db.query(
            'UPDATE cobranzas SET fecha_emision=?, mes=?, monto=?, estado=?, recargo=?, descuento=?, socios_id=?, cobradores_id=? WHERE id=?',
            [fecha_emision, mes, monto, estado, recargo, descuento, socios_id, cobradores_id, id]
        );
        
        res.json({ mensaje: 'Cobranza actualizada' });
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
        await db.query('DELETE FROM cobranzas WHERE id=?', [id]);
        
        res.json({ mensaje: 'Cobranza eliminada' });
    } catch (err) {
        next(err);
    }
}