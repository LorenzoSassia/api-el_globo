const express = require('express');
const router = express.Router();
const cobradoresController = require('../controllers/cobradoresController');
const { validarCobradores } = require('../middlewares/validaciones');
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

router.get('/', cobradoresController.getTodos);
router.get('/:id', cobradoresController.getPorId);
router.post('/', validarCobradores, validar, cobradoresController.insertar);
router.put('/:id', validarCobradores, validar, cobradoresController.modificar);
router.delete('/:id', cobradoresController.eliminar);

module.exports = router;