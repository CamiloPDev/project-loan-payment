const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const prestatarioRouter = require("./routes/borrowerRoute");
const prestamosRouter = require("./routes/loanRoute");
const pagosRouter = require("./routes/paymentRoute");
const estadoRouter = require("./routes/stateRoute");

app.use("/api/prestatarios", prestatarioRouter);
app.use("/api/prestamos", prestamosRouter);
app.use("/api/pagos", pagosRouter);
app.use("/api/estado", estadoRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});