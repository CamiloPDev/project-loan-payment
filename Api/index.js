const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const borrowerRouter = require("./routes/borrowerRoute");
const loanRouter = require("./routes/loanRoute");
const paymentRouter = require("./routes/paymentRoute");
const statusRouter = require("./routes/stateRoute");

app.use("/api/borrowers", borrowerRouter);
app.use("/api/loans", loanRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/status", statusRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API listening at http://localhost:${PORT}`);
});