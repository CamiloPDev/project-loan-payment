CREATE TABLE "BorrowerStatus" (
    "id" SERIAL PRIMARY KEY,
    "status" VARCHAR NOT NULL,
    "description" VARCHAR
);

CREATE TABLE "LoanStatus" (
    "id" SERIAL PRIMARY KEY,
    "status" VARCHAR NOT NULL,
    "description" VARCHAR
);

CREATE TABLE "Borrower" (
    "id" SERIAL PRIMARY KEY,
    "firstName" VARCHAR NOT NULL,
    "lastName" VARCHAR NOT NULL,
    "phone" VARCHAR,
    "registrationDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "borrowerStatusId" INT REFERENCES "BorrowerStatus"("id")
);

CREATE TABLE "Loans" (
    "id" SERIAL PRIMARY KEY,
    "borrowerId" INT REFERENCES "Borrower"("id"),
    "loanAmount" INT NOT NULL,
    "interestRate" DECIMAL(5, 2) NOT NULL,
    "date" DATE NOT NULL,
    "dueDate" DATE NOT NULL,
    "loanStatusId" INT REFERENCES "LoanStatus"("id")
);

CREATE TABLE "Payments" (
    "id" SERIAL PRIMARY KEY,
    "loanId" INT REFERENCES "Loans"("id"),
    "principalPayment" DECIMAL(10, 2) NOT NULL,
    "interestPayment" DECIMAL(10, 2) NOT NULL,
    "date" DATE NOT NULL
);

COMMIT;
