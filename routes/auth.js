const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db');
const authController = require('../controllers/authController');

// Ruta de login con clave cifrada
router.post('/login', authController.login);

// Ruta para registrar un nuevo usuario
router.post('/registro', authController.registro);

module.exports = router;
    