const express = require("express");
const { check } = require("express-validator");
const upload = require("../utils/upload");

const Domain = require("../models/domain");
const domainController = require("../controllers/domain");
const router = express.Router();

router.post(
  "/creating",
  [
    check("domainName", "Domain name required!")
      .trim()
      .custom((value) => {
        return Domain.findOne({ domainName: value }).then((d) => {
          if (d) {
            throw Promise.reject("Domain already exits!");
          }
        });
        // return throw new Error(value);
      }),
  ],
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
