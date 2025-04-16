const pool = require('../models/db');

exports.getLoans = async (req, res) => {
  const result = await pool.query('SELECT * FROM "Loans"');
  res.json(result.rows);
};

exports.createLoan = async (req, res) => {
  const { borrowerId, loanAmount, interestRate, date, dueDate, loanStatusId } = req.body;
  const result = await pool.query(
    `INSERT INTO "Loans" (id, loanAmount, interestRate, date, dueDate, loanStatusId)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [borrowerId, loanAmount, interestRate, date, dueDate, loanStatusId]
  );
  res.status(201).json(result.rows[0]);
};
