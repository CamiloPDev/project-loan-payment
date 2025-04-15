const pool = require('../models/db');

exports.getPrestatarios = async (req, res) => {
    const result = await pool.query('SELECT * FROM "Prestatario"');
    res.json(result.rows);
  };
  
  exports.createPrestatario = async (req, res) => {
    const { id, nombres, apellidos, telefono, idEstadoPrestatario } = req.body;
    const result = await pool.query(
      `INSERT INTO "Prestatario" (id, nombres, apellidos, telefono, idEstadoPrestatario)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id, nombres, apellidos, telefono, idEstadoPrestatario]
    );
    res.status(201).json(result.rows[0]);
  };