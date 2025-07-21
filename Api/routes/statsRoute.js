const express = require("express");
const router = express.Router();
const controller = require("../controllers/statsController");

router.get("/total-loans", controller.getTotalLoans);
router.get("/total-money-loaned", controller.getTotalMoneyLoaned);
router.get("/pending-capital", controller.getTotalPendingCapital);
router.get("/total-money-recovered", controller.getTotalMoneyRecovered);
router.get("/total-interest-earned", controller.getTotalInteresEarned);
router.get("/active-loans", controller.getActiveLoans);
router.get("/loan-summary-by-client", controller.getLoanByClient);
router.get("/loans-near-due", controller.getLoanNearDue);

module.exports = router;