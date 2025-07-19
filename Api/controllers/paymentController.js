const pool = require('../models/db');

exports.getPayments = async (req, res) => {
  const result = await pool.query('SELECT * FROM "Payments"');
  res.json(result.rows);
};

exports.getPaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM "Payments" WHERE "id" = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching Payment by ID:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.createPayment = async (req, res) => {
  const { description, loanId, principalPayment, interestPayment } = req.body;
  const result = await pool.query(
    `INSERT INTO "Payments" ("description", "loanId", "principalPayment", "interestPayment")
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [description, loanId, principalPayment, interestPayment]
  );
  res.status(201).json(result.rows[0]);
};

exports.updatePayment = async (req, res) => {
  const { id } = req.params;
  const { description, loanId, principalPayment, interestPayment, date } = req.body;

  try {
    const result = await pool.query(
      `UPDATE "Payments"
       SET "description" = $1,
          "loanId" = $2,
           "principalPayment" = $3,
           "interestPayment" = $4,
           "date" = $5
       WHERE "id" = $6
       RETURNING *`,
      [description, loanId, principalPayment, interestPayment, date, id]
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
