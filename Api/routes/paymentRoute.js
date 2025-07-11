const express = require("express");
const router = express.Router();
const controller = require("../controllers/paymentController");

router.get("/", controller.getPayments);
router.post("/", controller.createPayment);
router.put("/:id", controller.updatePayment);
router.delete("/:id", controller.deletePayment);

module.exports = router;
