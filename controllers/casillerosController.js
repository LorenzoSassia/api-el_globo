const db = require('../db');

/**
 * Obtiene todos los casilleros
 */
exports.getTodos = (req, res) => {
    db.query('SELECT * FROM casilleros', (err, results) => {
        if ( err ) return res.status(500).json({ error: err });
        res.json(results);
    });
};

/**
 * Obtiene un Casillero por ID
 */
exports.getPorId = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM casilleros WHERE id=?', [id], (err, results) => {
        if (err) return res.status(500).json({error: err});
        if(results.length === 0) return res.status(404).json({
            mensaje: 'Casillero no encontrado'
        });
        res.json(results[0])
    } )
}

/**
 * Insertar un Casillero
 */
exports.insertar = (req, res) => {
    const { nro_casillero, estado, monto_mensual } = req.body;
    db.query('INSERT INTO casilleros (nro_casillero, estado, monto_mensual) VALUES(?,?,?)', [nro_casillero, estado, monto_mensual],
        (err, result =>{
            if (err) return res.status(500).json({error: err});
            res.status(201).json({id: result.insertId});
        })
    );
};

/**
 * Actualizar Casillero
 */
exports.modificar = (req, res) => {
    const id = req.params.id;
    const {nro_casillero, estado, monto_mensual} = req.body;
    db.query('UPDATE casilleros SET nro_casillero=?, estado=?, monto_mensual=? WHERE id=?',
        [nro_casillero, estado, monto_mensual, id ],
        (err) => {
            if (err) return res.status(500).json({error: err});
            res.json({ mensaje: 'Casillero actualizado' });
        }
    );
};

/**
 * Eliminar Casillero
 */
exports.eliminar = (req,res) => {
    const id = req.params.id;
    db.query('DELETE FROM casilleros WHERE id=?', [id],
        (err) => {
            if (err) return res.status(500).json({error: err});
            res.json({ mensaje: 'Casillero eliminado' });
        });
}

