const pool = require('../models/db');

exports.getPrestamos = async (req, res) => {
  const result = await pool.query('SELECT * FROM "Prestamos"');
  res.json(result.rows);
};

exports.createPrestamo = async (req, res) => {
  const { idPrestatario, montoPrestamo, tasaInteres, fecha, fechaPlazoFinal, idEstadoPrestamo } = req.body;
  const result = await pool.query(
    `INSERT INTO "Prestamos" (id, montoPrestamo, tasaInteres, fecha, fechaPlazoFinal, idEstadoPrestamo)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [idPrestatario, montoPrestamo, tasaInteres, fecha, fechaPlazoFinal, idEstadoPrestamo]
  );
  res.status(201).json(result.rows[0]);
};
