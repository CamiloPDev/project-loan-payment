const express = require("express");
const router = express.Router();
const controller = require("../controllers/stateController");

router.get("/prestatario", controller.getEstadoPrestatario);
router.get("/prestamo", controller.getEstadoPrestamo);

module.exports = router;
