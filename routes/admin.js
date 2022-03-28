const express = require("express");
const adminCon = require("../controllers/admin");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

router.get("/tfdetails", isAuth, adminCon.tfdetails);

module.exports = router;
