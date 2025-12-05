const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db');

/**
 * Login
 */
exports.login = async (req, res, next) => {
    try {
        const { usuario, contrasena } = req.body;
        if(!usuario || !contrasena) return res.status(400).json({mensaje: 'Usuario y contraseña son obligatorios'});

        const [[usu]] = await db.query('SELECT * FROM usuarios WHERE usuario=?', [usuario]);
        if(!usu) return res.status(401).json({mensaje: 'Usuario no encontrado'});

        const match = await bcrypt.compare(contrasena, usu.contrasena);
        if(!match) return res.status(401).json({mensaje: 'Contraseña incorrecta'});

        const token = jwt.sign({ id: usu.id, usuario: usu.usuario, rol: usu.rol }, 'secreto123', {expiresIn: '1h'});
        res.json({
            token,
            usuario: {
                id: usu.id,
                usuario: usu.usuario,
                rol: usu.rol,
                idSocio: usu.idSocio, // <-- ¡AÑADIDO!
                idCobrador: usu.idCobrador, // <-- ¡AÑADIDO!
                nombreCompleto: usu.nombreCompleto
            }
        });
    } catch (err) {
        next(err);
    }
}

/**
 * Registro
 */
exports.registro = async (req, res, next) =>{
    try {
        const {usuario, contrasena, rol} = req.body;
        if(!usuario || !contrasena || !rol) return res.status(400).json({mensaje: 'Usuario, contraseña y rol son obligatorios'});

        const [[usuarioExistente]] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
        if(usuarioExistente) return res.status(400).json({mensaje: 'El usuario ya existe'});

        const hash = await bcrypt.hash(contrasena, 10);
        const [resultado] = await db.query('INSERT INTO usuarios(usuario, contrasena, rol) VALUES(?,?,?)', 
                                                [usuario, hash, rol]);
        res.status(201).json({ id: resultado.insertId, mensaje: 'Usuario creado'});                                       
    } catch (error) {
        next(error);
    }
}
