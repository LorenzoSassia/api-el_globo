const { body } = require('express-validator');

exports.validarSocios = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('apellido').notEmpty().withMessage('El apellido es obligatorio'),
    body('direccion').notEmpty().withMessage('La direccion es obligatoria'),
    body('dni').notEmpty().withMessage('El dni es obligatorio'),
    body('fechaNacimiento').notEmpty().withMessage('La fecha_nacimiento es obligatorio'),
    body('telefono').notEmpty().withMessage('El telefono es obligatorio'),
    body('email').notEmpty().withMessage('El email es obligatorio')
    
    
]

exports.validarCobranzas = [
    body('fecha_emision').notEmpty().withMessage('El fecha_emision es obligatorio'),
    body('mes').notEmpty().withMessage('El mes es obligatorio'),
    body('monto').isInt().withMessage('La monto es obligatoria'),
    body('estado').notEmpty().withMessage('El estado es obligatorio'),
    body('recargo').isFloat().withMessage('La recargo es obligatorio'),
    body('descuento').isFloat().withMessage('El descuento es obligatorio'),
    body('socios_id').notEmpty().withMessage('La socios_id es obligatorio'),
    body('cobradores_id').isInt().withMessage('El cobrtadores_id es obligatorio')
]

exports.validarActividades = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('costo').isFloat().withMessage('El costo es obligatoria'),
    body('turno').notEmpty().withMessage('El turno es obligatorio')
]

exports.validarUsuarios = [
    body('usuario').notEmpty().withMessage('El nombre es obligatorio'),
    body('contrasena').notEmpty().withMessage('El costo es obligatoria'),
    body('rol').notEmpty().withMessage('El turno es obligatorio')
    //body('idSocio').isInt().withMessage('El idSocio es obligatorio')
]

exports.validarCategorias = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('monto').isInt().withMessage('El monto es obligatoria')
  
]

exports.validarCasilleros = [
    body('nro_casillero').isInt().withMessage('El nro_casillero es obligatorio'),
    body('estado').notEmpty().withMessage('El estado es obligatoria'),
    body('monto_mensual').isInt().withMessage('El monto_mensual es obligatorio')
]

exports.validarCobradores = [
    body('nombre').notEmpty().withMessage('El nombre es obligatoria'),
    body('zonas_id').isInt({ gt: 0 }).withMessage('El ID de la zona es obligatorio y debe ser un número válido')
]
