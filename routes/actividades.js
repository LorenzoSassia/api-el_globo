const express = require('express');
const router = express.Router();
const actividadesController = require('../controllers/actividadesController');
const { validarActividades } = require('../middlewares/validaciones');
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
router.get('/', actividadesController.getTodos);
router.get('/:id', actividadesController.getPorId);
router.post('/', validarActividades, validar, actividadesController.insertar);
router.put('/:id', validarActividades, validar, actividadesController.modificar);
router.delete('/:id', actividadesController.eliminar);

module.exports = router;