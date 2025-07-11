const pool = require('../models/db');

exports.getBorrowerStatus = async (req, res) => {
  const result = await pool.query('SELECT * FROM "BorrowerStatus"');
  res.json(result.rows);
};

exports.getBorrowerStatusById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM "BorrowerStatus" WHERE "id" = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'BorrowerStatus not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching BorrowerStatus by ID:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
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

exports.updateBorrowerStatus = async (req, res) => {
  const { id } = req.params;
  const { status, description } = req.body;

  try {
    const result = await pool.query(
      `UPDATE "BorrowerStatus"
       SET "status" = $1,
           "description" = $2
       WHERE "id" = $3
       RETURNING *`,
      [status, description, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'BorrowerStatus not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating borrower status:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteBorrowerStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM "BorrowerStatus" WHERE "id" = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'BorrowerStatus not found' });
    }

    res.json({ message: 'BorrowerStatus deleted successfully' });
  } catch (err) {
    console.error('Error deleting BorrowerStatus:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getLoanStatus = async (req, res) => {
  const result = await pool.query('SELECT * FROM "LoanStatus"');
  res.json(result.rows);
};

exports.getLoanStatusById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM "LoanStatus" WHERE "id" = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'LoanStatus not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching LoanStatus by ID:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
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

exports.updateLoanStatus = async (req, res) => {
  const { id } = req.params;
  const { status, description } = req.body;

  try {
    const result = await pool.query(
      `UPDATE "LoanStatus"
       SET "status" = $1,
           "description" = $2
       WHERE "id" = $3
       RETURNING *`,
      [status, description, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'LoanStatus not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating loan status:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteLoanStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM "LoanStatus" WHERE "id" = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'LoanStatus not found' });
    }

    res.json({ message: 'LoanStatus deleted successfully' });
  } catch (err) {
    console.error('Error deleting LoanStatus:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
