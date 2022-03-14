const express = require("express");
const adminCon = require("../controllers/admin");
const router = express.Router();

router.get("/tfdetails", adminCon.tfdetails);

module.exports = router;
