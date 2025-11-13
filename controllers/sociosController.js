const db = require('../db');

/**
 * Obtiene todos los socios
 * (Traducción a async/await)
 */
exports.getTodos = async (req, res, next) => {
    try {
        const [results] = await db.query('SELECT * FROM socios');
        res.json(results);
    } catch (err) {
        // Pasa el error al manejador de errores de Express
        next(err);
    }
};

/**
 * Obtiene un socio por ID
 * (Traducción a async/await)
 */
exports.getSocioPorId = async (req, res, next) => {
    const id = req.params.id;
    try {
        const [results] = await db.query('SELECT * FROM socios WHERE id=?', [id]);
        
        if (results.length === 0) {
            return res.status(404).json({
                mensaje: 'Socio no encontrado'
            });
        }
        res.json(results[0]);
    } catch (err) {
        next(err);
    }
}

/**
 * Insertar un socio
 * (Traducción a async/await)
 */
exports.insertarSocio = async (req, res, next) => {
    const { nombre, apellido, direccion, dni, fecha_nacimiento, telefono, email, fecha_alta, estado, zona } = req.body;
    
    try {
        const [result] = await db.query(
            'INSERT INTO socios (nombre, apellido, direccion, dni, fecha_nacimiento, telefono, email, fecha_alta, estado, zona) VALUES(?,?,?,?,?,?,?,?,?,?)', 
            [nombre, apellido, direccion, dni, fecha_nacimiento, telefono, email, fecha_alta, estado, zona]
        );
        
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        next(err);
    }
};

/**
 * Actualizar socio
 * (Traducción a async/await)
 */
exports.modificarSocio = async (req, res, next) => {
    const id = req.params.id;
    const { nombre, apellido, direccion, dni, fecha_nacimiento, telefono, email, fecha_alta, estado, zona } = req.body;
    
    try {
        await db.query(
            'UPDATE socios SET nombre=?, apellido=?, direccion=?, dni=?, fecha_nacimiento=?, telefono=?, email=?, fecha_alta=?, estado=?, zona=? WHERE id=?',
            [nombre, apellido, direccion, dni, fecha_nacimient, telefono, email, fecha_alta, estado, zona, id]
        );
        
        res.json({ mensaje: 'Socio actualizado' });
    } catch (err) {
        next(err);
    }
};

/**
 * Eliminar Socio
 * (Traducción a async/await)
 */
exports.eliminarSocio = async (req, res, next) => {
    const id = req.params.id;
    
    try {
        await db.query('DELETE FROM socios WHERE id=?', [id]);
        
        res.json({ mensaje: 'Socio eliminado' });
    } catch (err) {
        next(err);
    }
}