const db = require('../db');

/**
 * Obtiene todos los socios
 */
exports.getTodos = (req, res) => {
    db.query('SELECT * FROM socios', (err, results) => {
        if ( err ) return res.status(500).json({ error: err });
        res.json(results);
    });
};

/**
 * Obtiene un socio por ID
 */
exports.getSocioPorId = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM socios WHERE id=?', [id], (err, results) => {
        if (err) return res.status(500).json({error: err});
        if(results.length === 0) return res.status(404).json({
            mensaje: 'Socio no encontrado'
        });
        res.json(results[0])
    } )
}

/**
 * Insertar un socio
 */
exports.insertarSocio = (req, res) => {
    const { nombre, apellido, direccion, dni, fecha_nacimiento, telefono, email, fecha_alta, estado, zona } = req.body;
    db.query('INSERT INTO socios (nombre, apellido, direccion, dni, fecha_nacimiento, telefono, email, fecha_alta, estado, zona) VALUES(?,?,?,?,?,?,?,?,?,?)', 
        [nombre, apellido, direccion, dni, fecha_nacimiento, telefono, email, fecha_alta, estado, zona],
        (err, result =>{
            if (err) return res.status(500).json({error: err});
            res.status(201).json({id: result.insertId});
        })
    );
};

/**
 * Actualizar socio
 */
exports.modificarSocio = (req, res) => {
    const id = req.params.id;
    const {nombre, apellido, direccion, dni, fecha_nacimiento, telefono, email, fecha_alta, estado, zona} = req.body;
    db.query('UPDATE socios SET nombre=?, apellido=?, direccion=?, dni=?, fecha_nacimiento=?, telefono=?, email=?, fecha_alta=?, estado=?, zona=? WHERE id=?',
        [nombre, apellido, direccion, dni, fecha_nacimiento, telefono, email, fecha_alta, estado, zona, id ],
        (err) => {
            if (err) return res.status(500).json({error: err});
            res.json({ mensaje: 'Socio actualizado' });
        }
    );
};

/**
 * Eliminar Socio
 */
exports.eliminarSocio = (req,res) => {
    const id = req.params.id;
    db.query('DELETE FROM socios WHERE id=?', [id],
        (err) => {
            if (err) return res.status(500).json({error: err});
            res.json({ mensaje: 'Socio eliminado' });
        });
}

