const express = require("express");
const router = express.Router();
const controller = require("../controllers/paymentController");

router.get("/", controller.getPagos);
router.post("/", controller.createPago);

module.exports = router;
