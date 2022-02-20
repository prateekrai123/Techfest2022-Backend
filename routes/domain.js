const express = require("express");
const { body } = require("express-validator");
const path = require("path");
const multer = require("multer");
const upload = require("../utils/upload");

const Domain = require("../models/domain");
const domainController = require("../controllers/domain");
const router = express.Router();

router.post(
  "/creating", //suppose we are admin
  [
    body(
      "domainName",
      "Domain name should be minimum 3 and maximum 32 character long!"
    ).isLength({ min: 3, max: 32 }),
    body(
      "domainInfo",
      "Domain Info should be minimum 10 and maximum 2000 character long!"
    ).isLength({ min: 10, max: 2000 }),
  ],
  upload.single("domain"),
  domainController.createDomain
);

router.get("/get-single/:did", domainController.getDomain);

module.exports = router;
