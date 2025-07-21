const pool = require('../models/db');

exports.getTotalLoans = async (req, res) => {
    const result = await pool.query('SELECT COUNT(*) AS total_loans FROM "Loans";');
    res.json(result.rows);
};

exports.getTotalMoneyLoaned = async (req, res) => {
    const result = await pool.query('SELECT SUM("loanAmount") AS total_money_loaned FROM "Loans";');
    res.json(result.rows);
};

exports.getTotalPendingCapital = async (req, res) => {
    const result = await pool.query(`
        SELECT 
            SUM(sub."loanAmount" - sub."totalPrincipalPaid") AS "totalPendingAmount"
        FROM (
        SELECT 
            l."id",
            l."loanAmount",
            COALESCE(SUM(p."principalPayment"), 0) AS "totalPrincipalPaid"
        FROM "Loans" l
        LEFT JOIN "Payments" p ON p."loanId" = l."id"
        JOIN "LoanStatus" s ON l."loanStatusId" = s."id"
        WHERE s."status" = 'Active'
        GROUP BY l."id", l."loanAmount"
        ) AS sub;
        `);
    res.json(result.rows);
};

exports.getTotalMoneyRecovered = async (req, res) => {
    const result = await pool.query('SELECT SUM("principalPayment") AS total_money_recovered FROM "Payments";');
    res.json(result.rows);
};

exports.getTotalInteresEarned = async (req, res) => {
    const result = await pool.query('SELECT SUM("interestPayment") AS total_interest_earned FROM "Payments";');
    res.json(result.rows);
};

exports.getActiveLoans = async (req, res) => {
    const result = await pool.query(`
        SELECT 
            b."firstName" || ' ' || b."lastName" AS "fullName",
            l.*,
            l."loanAmount" - COALESCE(SUM(p."principalPayment"), 0) AS "pendingAmount"
        FROM "Loans" l
        JOIN "Borrower" b ON l."borrowerId" = b."id"
        JOIN "LoanStatus" s ON l."loanStatusId" = s."id"
        LEFT JOIN "Payments" p ON l."id" = p."loanId"
        WHERE s."status" = 'Active'
        GROUP BY l."id", b."firstName", b."lastName"
        ORDER BY l."id";
    `);
    res.json(result.rows);
};

exports.getLoanByClient = async (req, res) => {
    const result = await pool.query(`
        SELECT 
            b."id" AS borrower_id,
            b."firstName" || ' ' || b."lastName" AS "fullName",
            SUM(l."loanAmount") AS total_loaned
        FROM "Borrower" b
        JOIN "Loans" l ON b."id" = l."borrowerId"
        GROUP BY b."id", b."firstName", b."lastName"
        ORDER BY total_loaned DESC;
        `);
    res.json(result.rows);
};

exports.getLoanNearDue = async (req, res) => {
    const result = await pool.query(`
        SELECT 
            b."firstName" || ' ' || b."lastName" AS "fullName",
            l.*,
            l."loanAmount" - COALESCE(SUM(p."principalPayment"), 0) AS "pendingAmount"
        FROM "Loans" l
        JOIN "Borrower" b ON l."borrowerId" = b."id"
        JOIN "LoanStatus" s ON l."loanStatusId" = s."id"
        LEFT JOIN "Payments" p ON p."loanId" = l."id"
        WHERE s."status" = 'Active'
        AND l."dueDate" <= CURRENT_DATE + INTERVAL '1 month'
        GROUP BY l."id", b."firstName", b."lastName"
        ORDER BY l."dueDate" ASC;
        `);
    res.json(result.rows);
};