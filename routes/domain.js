const express = require("express");
const { body, check } = require("express-validator");
const path = require("path");
const multer = require("multer");
const upload = require("../utils/upload");

const Domain = require("../models/domain");
const domainController = require("../controllers/domain");
const router = express.Router();

router.post(
  "/creating",
  upload.single("domain"),
  domainController.createDomain
);

router.get(
  "/get-single/:did",
  [check("did", "Id should be proper").isLength({ min: 24 })],
  domainController.getDomain
);

router.post("/img", upload.single("lola"), domainController.imagePost);

module.exports = router;
