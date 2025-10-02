const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db');

// Ruta de login con clave cifrada
router.post('/login', async (req, res, next) => {
    try {
        const { usuario, password } = req.body;
        if (!usuario || !password) return res.status(400).json({ mensaje: 'Usuario y contraseña obligatorios ' });
        
        const [[usu]] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]); 
        if (!usu) return res.status(401).json({ mensaje: 'Usuario no encontrado' });

        const match = await bcrypt.compare(password, usu.password);
        if (!match) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: usu.id, usuario: usu.usuario, rol: usu.rol }, 'secreto123', { expiresIn: '1h' });
        res.json({ token });

    } catch (error) {
        next(err);
    }
});

// Ruta para registrar un nuevo usuario
router.post('/registro', async (req, res, next) => {
    try {
        const { usuario, password, rol } = req.body;
        if (!usuario || !password || !rol) return res.status(400).json({ mensaje: 'Usuario, contraseña y rol son obligatorios' });

        const [[usuarioExistente]] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
        if (usuarioExistente) return res.status(400).json({ mensaje: 'El usuario ya existe' });

        const hash = await bcrypt.hash(password, 10);
        const [resultado] = await db.query('INSERT INTO usuarios (usuario, password, rol) VALUES (?, ?, ?)', [usuario, hash, rol]);
        res.status(201).json({ id: resultado.insertId, mensaje: 'Usuario creado' }); 
    } catch (error) {
        next(err);
    }
});

module.exports = router;
    