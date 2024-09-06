require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const asyncHandler = require('express-async-handler');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const mascotaRoutes = require('./routes/mascotaRoute');
const clienteRoutes = require('./routes/clienteRoute');
const adminRoutes = require('./routes/adminRoute');
const vaterinarioRoutes = require('./routes/veterinarioRoute');
const citaRoutes = require('./routes/citaRoute');
const rolRoutes = require('./routes/rolRoute');
const authRoutes = require('./routes/authRoute');
const historialClinicoRoutes = require('./routes/historialClinicoRoute');


app.use(cors({
    origin: "https://petveterinary-app.web.app", // Permite solicitudes desde este origen
    origin: "http://localhost:4200", // Permite solicitudes desde este origen para pruebas locales**
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
    credentials: true // Permite el envío de credenciales (opcional)
}));
app.use(express.json());

// rutas de mascotas, cliente y citas
app.use('/api/mascota', mascotaRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/cliente', clienteRoutes);
app.use('/api/veterinario', vaterinarioRoutes);
app.use('/api/cita', citaRoutes);
app.use('/api/rol', rolRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/historialClinico', historialClinicoRoutes);

// ruta raíz
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

// mongodb conexión
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Conectado a Mongo Atlas');
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1); // Detener el servidor si la conexión falla
    });
