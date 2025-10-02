exports.manejoErrores = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Error Interno del servidor',
        details: err.message
    });
}