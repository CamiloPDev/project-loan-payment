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
