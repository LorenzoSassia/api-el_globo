const express = require('express');
const router = express.Router();
const cobranzasController = require('../controllers/cobranzasController');
const { validarCobranzas } = require('../middlewares/validaciones');
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

router.get('/', cobranzasController.getTodos);
router.get('/:id', cobranzasController.getPorId);
router.post('/', validarCobranzas, validar, cobranzasController.insertar);
router.put('/:id', validarCobranzas, validar, cobranzasController.modificar);
router.delete('/:id', cobranzasController.eliminar);

module.exports = router;