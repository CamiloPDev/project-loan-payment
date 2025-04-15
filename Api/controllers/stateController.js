const pool = require('../models/db');

exports.getEstadoPrestatario = async (req, res) => {
  const result = await pool.query('SELECT * FROM "EstadoPrestatario"');
  res.json(result.rows);
};

exports.getEstadoPrestamo = async (req, res) => {
  const result = await pool.query('SELECT * FROM "EstadoPrestamo"');
  res.json(result.rows);
};
