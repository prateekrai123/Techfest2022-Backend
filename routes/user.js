const { check } = require("express-validator");
const { hasPaymendSuccess } = require("../controllers/pay");
const {
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  pushEvent,
  pushWorkshop,
  getReferralCode,
} = require("../controllers/user");
const isAuth = require("../middleware/isAuth");

const router = require("express").Router();

router.get("/allUsers", isAuth, getAllUsers);

router.get("/getUserById", isAuth, getUserById);

router.get(
  "/getUserByEmail",
  [check("email", "Email is required")],
  getUserByEmail
);

router.post("/updateUser", isAuth, updateUser);

router.post(
  "/pushEvent",
  isAuth,
  hasPaymendSuccess,
  [check("event", "event is required")],
  pushEvent
);

router.post(
  "/pushWorkshop",

  isAuth,
  hasPaymendSuccess,
  [check("workshop", "workshop is required")],
  pushWorkshop
);

router.get("/referralCode", getReferralCode);

module.exports = router;
