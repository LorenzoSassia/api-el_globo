const express = require('express');
const router = express.Router();
const sociosController = require('../controllers/sociosController');
const { validarSocios } = require('../middlewares/validaciones');
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
router.get('/', sociosController.getTodos);
router.get('/:id', sociosController.getSocioPorId);
router.post('/', validarSocios, validar, sociosController.insertarSocio);
router.put('/:id', validarSocios, validar, sociosController.modificarSocio);
router.delete('/:id', sociosController.eliminarSocio);

module.exports = router;