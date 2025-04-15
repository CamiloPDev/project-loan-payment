const express = require("express");
const router = express.Router();
const controller = require("../controllers/loanController");

router.get("/", controller.getPrestamos);
router.post("/", controller.createPrestamo);

module.exports = router;
