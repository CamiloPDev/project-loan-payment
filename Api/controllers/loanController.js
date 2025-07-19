const pool = require('../models/db');

exports.getLoans = async (req, res) => {
  const result = await pool.query('SELECT * FROM "Loans"');
  res.json(result.rows);
};

exports.getLoanById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM "Loans" WHERE "id" = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching Loan by ID:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createLoan = async (req, res) => {
  const { description, borrowerId, loanAmount, interestRate, dueDate, loanStatusId } = req.body;
  const result = await pool.query(
    `INSERT INTO "Loans" ("description", "borrowerId", "loanAmount", "interestRate", "dueDate", "loanStatusId")
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [description, borrowerId, loanAmount, interestRate, dueDate, loanStatusId]
  );
  res.status(201).json(result.rows[0]);
};

exports.updateLoan = async (req, res) => {
  const { id } = req.params;
  const { description, borrowerId, loanAmount, interestRate, date, dueDate, loanStatusId } = req.body;

  try {
    const result = await pool.query(
      `UPDATE "Loans"
       SET "description" = $1,
           "borrowerId" = $2,
           "loanAmount" = $3,
           "interestRate" = $4,
           "date" = $5,
           "dueDate" = $6,
           "loanStatusId" = $7
       WHERE "id" = $8
       RETURNING *`,
      [description, borrowerId, loanAmount, interestRate, date, dueDate, loanStatusId, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating loan:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteLoan = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM "Loans" WHERE "id" = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Loan not found' });
    }

    res.json({ message: 'Loan deleted successfully' });
  } catch (err) {
    console.error('Error deleting loan:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};