const express = require("express");
const router = express.Router();
const controller = require("../controllers/stateController");

router.get("/borrower", controller.getBorrowerStatus);
router.post("/borrower", controller.createBorrowerStatus);
router.get("/loan", controller.getLoanStatus);
router.post("/loan", controller.createLoanStatus);

module.exports = router;
