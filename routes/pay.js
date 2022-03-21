const express = require("express");
const payCon = require("../controllers/pay");
const router = express.Router();

router.post("/user", payCon.payUser);
router.get("/success", payCon.successPay);
router.get("/fail", payCon.failPay);

module.exports = router;
