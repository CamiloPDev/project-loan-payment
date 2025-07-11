const pool = require('../models/db');

exports.getBorrowers = async (req, res) => {
    const result = await pool.query('SELECT * FROM "Borrower"');
    res.json(result.rows);
};

exports.createBorrower = async (req, res) => {
    const { id, firstName, lastName, phone, borrowerStatusId } = req.body;
    const result = await pool.query(
      `INSERT INTO "Borrower" ("id", "firstName", "lastName", "phone", "borrowerStatusId")
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id, firstName, lastName, phone, borrowerStatusId]
    );
    res.status(201).json(result.rows[0]);
};

exports.updateBorrower = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, phone, borrowerStatusId } = req.body;

    try {
        const result = await pool.query(
            `UPDATE "Borrower"
             SET "firstName" = $1,
                 "lastName" = $2,
                 "phone" = $3,
                 "borrowerStatusId" = $4
             WHERE "id" = $5
             RETURNING *`,
            [firstName, lastName, phone, borrowerStatusId, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Borrower not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating borrower:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteBorrower = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            `DELETE FROM "Borrower" WHERE "id" = $1 RETURNING *`,
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Borrower not found' });
        }

        res.json({ message: 'Borrower deleted successfully' });
    } catch (err) {
        console.error('Error deleting borrower:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};