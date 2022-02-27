const express = require("express");
const { body } = require("express-validator");
const path = require("path");
const multer = require("multer");
const upload = require("../utils/upload");
const { check } = require("express-validator");
const coordinatorController = require("../controllers/coordinator");
const Coordinator = require("../models/coordinator");

const router = express.Router();

//GET, PUT, POST localhost:4000/api/coordinator
router.post(
  "/creating",
  upload.single("profile"),
  coordinatorController.createCoordinator
);
router.get(
  "/get/:cid",
  [check("cid", "Id should be proper").isLength({ min: 24 })],

  coordinatorController.getCoordinatorById
);

router.get("/get-all-details", coordinatorController.getAllDetailsCoordinator);

router.put(
  "/update/:cid",
  [check("cid", "Id should be proper").isLength({ min: 24 })],
  coordinatorController.updateCoordinator
);
router.delete(
  "/delete/:cid",
  [check("cid", "Id should be proper").isLength({ min: 24 })],
  coordinatorController.deleteCoordinator
);

router.post("/img", upload.single("lola"), coordinatorController.imagePost);

module.exports = router;
