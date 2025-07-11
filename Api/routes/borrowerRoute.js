const express = require("express");
const router = express.Router();
const controller = require("../controllers/borrowerController");

router.get("/", controller.getBorrowers);
router.get("/:id", controller.getBorrowerById);
router.post("/", controller.createBorrower);
router.put('/:id', controller.updateBorrower);
router.delete('/:id', controller.deleteBorrower);

module.exports = router;
