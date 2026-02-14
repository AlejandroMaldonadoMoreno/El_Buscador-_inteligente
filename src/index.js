const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productosRoutes = require('./routes/productosRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static('cors'));


app.use('/api/productos', productosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo ${PORT}`);
});

