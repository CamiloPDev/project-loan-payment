const pool = require('../models/db');

exports.getPayments = async (req, res) => {
  const result = await pool.query('SELECT * FROM "Payments"');
  res.json(result.rows);
};

exports.createPayment = async (req, res) => {
  const { loanId, principalPayment, interestPayment, date } = req.body;
  const result = await pool.query(
    `INSERT INTO "Payments" ("loanId", "principalPayment", "interestPayment", "date")
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [loanId, principalPayment, interestPayment, date]
  );
  res.status(201).json(result.rows[0]);
};
