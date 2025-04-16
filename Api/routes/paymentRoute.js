const express = require("express");
const router = express.Router();
const controller = require("../controllers/paymentController");

router.get("/", controller.getPayments);
router.post("/", controller.createPayment);

module.exports = router;
