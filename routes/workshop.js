const express = require("express");
const { check } = require("express-validator");
const workshopController = require("../controllers/workshop");
const upload = require("../utils/upload");

const router = express.Router();

router.get(
  "/get/:wId",
  [check("wId", "Id should be proper").isLength({ min: 24 })],
  workshopController.getWorkshop
);
router.post(
  "/create",
  [
    check("wsName", "Workshop name required!"),
    check("wsDesc", "Workshop name required!"),
    check("wsDesc", "Workshop name required!"),
    check("studentCoordinator", "Student coordinator names are required!"),
    check("facultyCoordinator", "Faculty coordinator name are required!"),
    check("endDate", "Workshop name required!"),
  ],
  upload.single("workshop"),
  workshopController.createWorkshop
);

router.get("/all", workshopController.getAllWokshop);
router.delete(
  "/del/:wId",
  [check("wId", "Id should be proper").isLength({ min: 24 })],
  workshopController.deleteWorkshop
);
module.exports = router;
