const db = require('../db');

/**
 * Obtiene todos 
 */
exports.getTodos = (req, res) => {
    db.query('SELECT * FROM categorias', (err, results) => {
        if ( err ) return res.status(500).json({ error: err });
        res.json(results);
    });
};

/**
 * Obtiene uno por ID
 */
exports.getPorId = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM categorias WHERE id=?', [id], (err, results) => {
        if (err) return res.status(500).json({error: err});
        if(results.length === 0) return res.status(404).json({
            mensaje: 'categorias no encontrado'
        });
        res.json(results[0])
    } )
}

/**
 * Insertar uno 
 */
exports.insertar = (req, res) => {
    const { nombre, cuit, direccion } = req.body;
    db.query('INSERT INTO categorias (nombre, monto) VALUES(?,?)', [nombre, monto],
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
    db.query('UPDATE categorias SET nombre=?, monto=? WHERE id=?',
        [nombre, cuit, direccion, id ],
        (err) => {
            if (err) return res.status(500).json({error: err});
            res.json({ mensaje: 'categorias actualizado' });
        }
    );
};

/**
 * Eliminar 
 */
exports.eliminar = (req,res) => {
    const id = req.params.id;
    db.query('DELETE FROM categorias WHERE id=?', [id],
        (err) => {
            if (err) return res.status(500).json({error: err});
            res.json({ mensaje: 'categorias eliminado' });
        });
}

