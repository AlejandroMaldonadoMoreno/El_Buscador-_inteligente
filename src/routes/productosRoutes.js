const express = require('express');
const router = express.Router();
const { obtenerProductos, buscarProductos } = require('../controllers/productosController');

// Para búsqueda de productos
router.get('/search', buscarProductos);

// Para obtener todos los productos
router.get('/', obtenerProductos);

module.exports = router;
