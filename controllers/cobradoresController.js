const db = require('../db');

/**
 * Obtiene todos 
 */
exports.getTodos = (req, res) => {
    db.query('SELECT * FROM cobradores', (err, results) => {
        if ( err ) return res.status(500).json({ error: err });
        res.json(results);
    });
};

/**
 * Obtiene uno por ID
 */
exports.getPorId = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM cobradores WHERE id=?', [id], (err, results) => {
        if (err) return res.status(500).json({error: err});
        if(results.length === 0) return res.status(404).json({
            mensaje: 'cobrador no encontrado'
        });
        res.json(results[0])
    } )
}

/**
 * Insertar uno 
 */
exports.insertar = (req, res) => {
    const { nombre, cuit, direccion } = req.body;
    db.query('INSERT INTO cobradores (nombre, zona) VALUES(?,?)', [nombre, zona],
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
    const {nombre, cuit, direccion} = req.body;
    db.query('UPDATE cobradores SET nombre=?, zona=? WHERE id=?',
        [nombre, cuit, direccion, id ],
        (err) => {
            if (err) return res.status(500).json({error: err});
            res.json({ mensaje: 'cobrador actualizado' });
        }
    );
};

/**
 * Eliminar 
 */
exports.eliminar = (req,res) => {
    const id = req.params.id;
    db.query('DELETE FROM cobradores WHERE id=?', [id],
        (err) => {
            if (err) return res.status(500).json({error: err});
            res.json({ mensaje: 'cobrador eliminado' });
        });
}

