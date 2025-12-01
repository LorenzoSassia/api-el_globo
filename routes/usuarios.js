const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { validarUsuarios } = require('../middlewares/validaciones');
const { validationResult } = require('express-validator');

const validar = (req, res, next) => {
    const errores = validationResult(req);
    if ( !errores.isEmpty() ) {
        return res.status(400).json({
            errores: errores.array()
        });
    }
    next();
}
router.get('/', usuariosController.getTodos);
router.get('/:id', usuariosController.getPorId);
router.post('/', validarUsuarios, validar, usuariosController.insertar);
router.put('/:id', validarUsuarios, validar, usuariosController.modificar);
router.delete('/:id', usuariosController.eliminar);

module.exports = router;