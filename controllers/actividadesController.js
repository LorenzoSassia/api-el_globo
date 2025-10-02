const db = require('../db');

/**
 * Obtiene todos 
 */
exports.getTodos = (req, res) => {
    db.query('SELECT * FROM actividades', (err, results) => {
        if ( err ) return res.status(500).json({ error: err });
        res.json(results);
    });
};

/**
 * Obtiene uno por ID
 */
exports.getPorId = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM actividades WHERE id=?', [id], (err, results) => {
        if (err) return res.status(500).json({error: err});
        if(results.length === 0) return res.status(404).json({
            mensaje: 'Actividad no encontrada'
        });
        res.json(results[0])
    } )
}

/**
 * Insertar uno 
 */
exports.insertar = (req, res) => {
    const { nombre, costo, turno } = req.body;

    
    db.query('INSERT INTO actividades (nombre, costo, turno) VALUES(?,?,?)', [nombre, costo, turno],
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
    const {nombre, costo, turno} = req.body;
    db.query('UPDATE actividades SET nombre=?, costo=?, turno=? WHERE id=?',
        [nombre, costo, turno, id ],
        (err) => {
            if (err) return res.status(500).json({error: err});
            res.json({ mensaje: 'Actividad actualizada' });
        }
    );
};

/**
 * Eliminar 
 */
exports.eliminar = (req,res) => {
    const id = req.params.id;
    db.query('DELETE FROM actividades WHERE id=?', [id],
        (err) => {
            if (err) return res.status(500).json({error: err});
            res.json({ mensaje: 'Actividad eliminada' });
        });
}

