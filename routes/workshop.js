const express = require("express");
const workshopController = require("../controllers/workshop");

const router = express.Router();

// router.get("/:wId", workshopController.getWorkshop);
router.post("/create", workshopController.createWorkshop);
router.post("/h", workshopController.createFiles);
router.get("/h", workshopController.getFile);
module.exports = router;
