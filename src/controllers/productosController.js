const pool = require('../config/db');

const obtenerProductos = async (req, res) => {
    try {
        const resultado = await pool.query(
            `select p.id_producto, p.nombre, p.descripcion, c.nombre as categoria, p.precio, p.stock 
            from productos p left join categoria c on p.id_categoria = c.id_categoria order by p.id_producto`
        );

        res.json(resultado.rows);
    } catch (error) {
        console.error('error al obtener productos:', error);
        res.status(500).json({ error: 'error al obtener productos' });
    }
};

const buscarProductos = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.trim() === '') {
            return res.status(400).json({ error: 'falta el parametro q' });
        }

        const termino = "%" + q.trim() + "%";

        const resultado = await pool.query(
            `select p.id_producto, p.nombre, p.descripcion, c.nombre as categoria, p.precio, p.stock 
            from productos p left join categoria c on p.id_categoria = c.id_categoria where p.nombre ilike $1 or p.descripcion ilike $1 order by p.id_producto`,
            [termino]
        );

        res.json(resultado.rows);
    } catch (error) {
        console.error('error al buscar productos:', error);
        res.status(500).json({ error: 'error al buscar productos' });
    }
};

module.exports = { obtenerProductos, buscarProductos };
