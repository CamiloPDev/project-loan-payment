const express = require("express");
const router = express.Router();
const controller = require("../controllers/stateController");

router.get("/borrower", controller.getBorrowerStatus);
router.get("/loan", controller.getLoanStatus);

module.exports = router;
