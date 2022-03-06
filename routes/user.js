const { check } = require("express-validator");
const {
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  pushEvent,
  pushWorkshop,
  getReferralCode,
} = require("../controllers/user");

const router = require("express").Router();

router.get("/allUsers", getAllUsers);

router.get("/getUserById", [check("id", "id is required")], getUserById);

router.get(
  "/getUserByEmail",
  [check("email", "Email is required")],
  getUserByEmail
);

router.post("/updateUser", updateUser);

router.post("/pushEvent", [check("event", "event is required")], pushEvent);

router.post(
  "/pushWorkshop",
  [check("workshop", "workshop is required")],
  pushWorkshop
);

router.get("/referralCode", getReferralCode);

module.exports = router;
