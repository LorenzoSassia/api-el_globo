const express = require('express');
const router = express.Router();
const casillerosController = require('../controllers/casillerosController');
const { validarCasilleros } = require('../middlewares/validaciones');
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

router.get('/', casillerosController.getTodos);
router.get('/:id', casillerosController.getPorId);
router.post('/', validarCasilleros, validar, casillerosController.insertar);
router.put('/:id', validarCasilleros, validar, casillerosController.modificar);
router.delete('/:id', casillerosController.eliminar);

module.exports = router;