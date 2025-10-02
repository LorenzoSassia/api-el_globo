const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const subirArchivo = require('express-fileupload');
const { manejoErrores } = require('./middlewares/manejoErrores');


const app = express();
const sociosRoutes = require('./routes/socios'); 
const casillerosRoutes = require('./routes/casilleros');
const actividadesRoutes = require('./routes/actividades');
const cobranzasRoutes = require('./routes/cobranzas');
const cobradoresRoutes = require('./routes/cobradores');
const categoriasRoutes = require('./routes/categorias');


app.use(cors());
app.use(bodyParser.json());
app.use(subirArchivo());

// Servir la carpeta Imagenes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/socios', sociosRoutes);
app.use('/api/casilleros', casillerosRoutes);
app.use('/api/actividades', actividadesRoutes);
app.use('/api/cobranzas', cobranzasRoutes);
app.use('/api/cobradores', cobradoresRoutes);
app.use('/api/categorias', categoriasRoutes);

// 💡 RUTA AÑADIDA PARA PRUEBA DE CONEXIÓN DEL FRONTEND
app.get('/api/mensaje', (req, res) => {
    // Esta respuesta es la que tu frontend de React está esperando
    res.json({ 
        mensaje: "¡Conexión API exitosa!",
        status: "ok"
    });
});

app.use(manejoErrores);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})