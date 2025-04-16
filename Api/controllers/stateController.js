const pool = require('../models/db');

exports.getBorrowerStatus = async (req, res) => {
  const result = await pool.query('SELECT * FROM "BorrowerStatus"');
  res.json(result.rows);
};

exports.getLoanStatus = async (req, res) => {
  const result = await pool.query('SELECT * FROM "LoanStatus"');
  res.json(result.rows);
};
