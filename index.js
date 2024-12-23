const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const machinesRoutes = require('./routes/machines');
const serviceRoutes = require('./routes/serviceRoutes');

require('dotenv').config();

const app = express();
const port = 80;

// Configurar CORS para permitir todas las solicitudes
app.use(cors());  // Permite todos los orígenes

// Middleware para procesar JSON en las solicitudes
app.use(express.json());

// Usar las rutas
app.use('/api/machines', machinesRoutes);
app.use('/api/services', serviceRoutes);

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Conectar con la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.log('Error al conectar a MongoDB:', err));


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
