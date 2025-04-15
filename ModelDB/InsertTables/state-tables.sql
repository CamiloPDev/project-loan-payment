INSERT INTO "LoanStatus" ("status", "description") VALUES
('Pending', 'The loan has been requested but not approved.'),
('Active', 'The loan has been disbursed and is currently in progress.'),
('Completed', 'The loan has been fully repaid.'),
('Delinquent', 'The loan has overdue payments.'),
('Cancelled', 'The loan was cancelled before activation.');

INSERT INTO "BorrowerStatus" ("status", "description") VALUES
('Active', 'The borrower is eligible to apply for loans.'),
('Inactive', 'The borrower cannot perform operations at the moment.'),
('Delinquent', 'The borrower has overdue debts.'),
('Banned', 'The borrower has been banned due to poor payment history.');

COMMIT;
