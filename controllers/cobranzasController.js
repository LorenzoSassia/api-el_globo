const db = require('../db');

/**
 * Obtiene todos 
 */
exports.getTodos = (req, res) => {
    db.query('SELECT * FROM cobranzas', (err, results) => {
        if ( err ) return res.status(500).json({ error: err });
        res.json(results);
    });
};

/**
 * Obtiene uno por ID
 */
exports.getPorId = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM cobranzas WHERE id=?', [id], (err, results) => {
        if (err) return res.status(500).json({error: err});
        if(results.length === 0) return res.status(404).json({
            mensaje: 'Cobranza no encontrada'
        });
        res.json(results[0])
    } )
}

/**
 * Insertar uno 
 */
exports.insertar = (req, res) => {
    const { fecha_emision, mes, monto, estado, recargo, descuento, socios_id, cobradores_id } = req.body;
    db.query('INSERT INTO cobranzas (fecha_emision, mes, monto, estado, recargo, descuento, socios_id, cobradores_id) VALUES(?,?,?,?,?,?,?,?)', 
        [fecha_emision, mes, monto, estado, recargo, descuento, socios_id, cobradores_id],
        (err, result =>{
            if (err) return res.status(500).json({error: err});
            res.status(201).json({id: result.insertId});
        })
    );
};

/**
 * Actualizar 
 */
exports.modificar = (req, res) => {
    const id = req.params.id;
    const {fecha_emision, mes, monto, estado, recargo, descuento, socios_id, cobradores_id} = req.body;
    db.query('UPDATE cobranzas SET fecha_emision=?, mes=?, monto=?, estado=?, recargo=?, descuento=?, socios_id=?, cobradores_id=? WHERE id=?',
        [fecha_emision, mes, monto, estado, recargo, descuento, socios_id, cobradores_id, id ],
        (err) => {
            if (err) return res.status(500).json({error: err});
            res.json({ mensaje: 'Cobranza actualizada' });
        }
    );
};

/**
 * Eliminar 
 */
exports.eliminar = (req,res) => {
    const id = req.params.id;
    db.query('DELETE FROM cobranzas WHERE id=?', [id],
        (err) => {
            if (err) return res.status(500).json({error: err});
            res.json({ mensaje: 'Cobranza eliminada' });
        });
}

