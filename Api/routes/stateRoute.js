const express = require("express");
const router = express.Router();
const controller = require("../controllers/stateController");

router.get("/borrower", controller.getBorrowerStatus);
router.get("/borrower/:id", controller.getBorrowerStatusById);
router.post("/borrower", controller.createBorrowerStatus);
router.put("/borrower/:id", controller.updateBorrowerStatus);
router.delete("/borrower/:id", controller.deleteBorrowerStatus);

router.get("/loan", controller.getLoanStatus);
router.get("/loan/:id", controller.getLoanStatusById);
router.post("/loan", controller.createLoanStatus);
router.put("/loan/:id", controller.updateLoanStatus);
router.delete("/loan/:id", controller.deleteLoanStatus);

module.exports = router;
