const express = require('express');
const router = express.Router();
const vistaCobranzasController = require('../controllers/vistaCobranzasController');
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

router.get('/', vistaCobranzasController.getTodos);
router.get('/:id', vistaCobranzasController.getPorId);

module.exports = router;