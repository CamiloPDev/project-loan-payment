const pool = require('../models/db');

exports.getBorrowerStatus = async (req, res) => {
  const result = await pool.query('SELECT * FROM "BorrowerStatus"');
  res.json(result.rows);
};

exports.createBorrowerStatus = async (req, res) => {
  const { status, description } = req.body;
  const result = await pool.query(
    `INSERT INTO "BorrowerStatus" ("status", "description")
     VALUES ($1, $2) RETURNING *`,
    [status, description]
  );
  res.status(201).json(result.rows[0]);
};

exports.getLoanStatus = async (req, res) => {
  const result = await pool.query('SELECT * FROM "LoanStatus"');
  res.json(result.rows);
};

exports.createLoanStatus = async (req, res) => {
  const { status, description } = req.body;
  const result = await pool.query(
    `INSERT INTO "LoanStatus" ("status", "description")
     VALUES ($1, $2) RETURNING *`,
    [status, description]
  );
  res.status(201).json(result.rows[0]);
};