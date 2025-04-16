const express = require("express");
const router = express.Router();
const controller = require("../controllers/loanController");

router.get("/", controller.getLoans);
router.post("/", controller.createLoan);

module.exports = router;
