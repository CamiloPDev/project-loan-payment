const express = require("express");
const router = express.Router();
const controller = require("../controllers/borrowerController");

router.get("/", controller.getPrestatarios);
router.post("/", controller.createPrestatario);

module.exports = router;