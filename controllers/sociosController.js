//socioController.js

const db = require('../db');

// Función auxiliar para convertir vacíos a NULL (evita errores de fecha en MySQL)
const cleanDate = (date) => (date && date !== '') ? date : null;

/**
 * Obtiene todos los socios
 */
exports.getTodos = async (req, res, next) => {
    try {
        const [results] = await db.query('SELECT * FROM socios');
        res.json(results);
    } catch (err) {
        next(err);
    }
};

/**
 * Obtiene un socio por ID
 */
exports.getSocioPorId = async (req, res, next) => {
    const id = req.params.id;
    try {
        const [results] = await db.query('SELECT * FROM socios WHERE id=?', [id]);
        
        if (results.length === 0) {
            return res.status(404).json({ mensaje: 'Socio no encontrado' });
        }
        res.json(results[0]);
    } catch (err) {
        next(err);
    }
}

/**
 * Insertar un socio
 */
exports.insertarSocio = async (req, res, next) => {
    const { nombre, apellido, direccion, dni, fechaNacimiento, telefono, email, fechaAlta, estado, idZona, idCategoria, idCasillero } = req.body;
    
    try {
        const [result] = await db.query(
            'INSERT INTO socios (nombre, apellido, direccion, dni, fechaNacimiento, telefono, email, fechaAlta, estado, idZona, idCategoria, idCasillero) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)', 
            [
                nombre, 
                apellido, 
                direccion, 
                dni, 
                cleanDate(fechaNacimiento), // Usa cleanDate para evitar errores
                telefono, 
                email, 
                cleanDate(fechaAlta),      // Usa cleanDate para evitar errores
                estado, 
                idZona,
                idCategoria,
                idCasillero
            ]
        );
        
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        console.error("Error al insertar socio:", err); // Log para depurar
        next(err);
    }
};


/**
 * Actualizar socio
 */
exports.modificarSocio = async (req, res, next) => {
    const id = req.params.id;
    const { nombre, apellido, direccion, dni, fechaNacimiento, telefono, email, fechaAlta, estado, idZona, idCategoria, idCasillero } = req.body;
    
    console.log("Datos recibidos para modificar:", req.body); // ¡Mira esto en tu terminal!

    try {
        await db.query(
            'UPDATE socios SET nombre=?, apellido=?, direccion=?, dni=?, fechaNacimiento=?, telefono=?, email=?, fechaAlta=?, estado=?, idZona=?, idCategoria=?, idCasillero=? WHERE id=?',
            [
                nombre, 
                apellido, 
                direccion, 
                dni, 
                cleanDate(fechaNacimiento), // Usa cleanDate
                telefono, 
                email, 
                cleanDate(fechaAlta),      // Usa cleanDate
                estado, 
                idZona, 
                idCategoria,
                idCasillero,
                id
            ]
        );
        
        res.json({ mensaje: 'Socio actualizado' });
    } catch (err) {
        console.error("Error al modificar socio:", err);
        next(err);
    }
};

/**
 * Eliminar Socio
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