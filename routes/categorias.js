const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriasController');
const { validarCategorias } = require('../middlewares/validaciones');
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

router.get('/', categoriasController.getTodos);
router.get('/:id', categoriasController.getPorId);
router.post('/', validarCategorias, validar, categoriasController.insertar);
router.put('/:id', validarCategorias, validar, categoriasController.modificar);
router.delete('/:id', categoriasController.eliminar);

module.exports = router;