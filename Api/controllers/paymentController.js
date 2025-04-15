const pool = require('../models/db');

exports.getPagos = async (req, res) => {
  const result = await pool.query('SELECT * FROM "Pagos"');
  res.json(result.rows);
};

exports.createPago = async (req, res) => {
  const { idPrestamo, pagoAbono, pagoInteres, fecha } = req.body;
  const result = await pool.query(
    `INSERT INTO "Pagos" (id, pagoAbono, pagoInteres, fecha)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [idPrestamo, pagoAbono, pagoInteres, fecha]
  );
  res.status(201).json(result.rows[0]);
};
