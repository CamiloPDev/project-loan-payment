const express = require("express");
const router = express.Router();
const controller = require("../controllers/borrowerController");

router.get("/", controller.getBorrowers);
router.post("/", controller.createBorrower);

module.exports = router;
