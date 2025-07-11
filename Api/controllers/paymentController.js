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

exports.updatePayment = async (req, res) => {
  const { id } = req.params;
  const { loanId, principalPayment, interestPayment, date } = req.body;

  try {
    const result = await pool.query(
      `UPDATE "Payments"
       SET "loanId" = $1,
           "principalPayment" = $2,
           "interestPayment" = $3,
           "date" = $4
       WHERE "id" = $5
       RETURNING *`,
      [loanId, principalPayment, interestPayment, date, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating payment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deletePayment = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM "Payments" WHERE "id" = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json({ message: 'Payment deleted successfully' });
  } catch (err) {
    console.error('Error deleting payment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
