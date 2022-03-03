const express = require("express");
const { check } = require("express-validator");
const {
  signUp,
  signIn,
  verifyUser,
  verify,
  resetPassword,
  signOut,
  forgotPassword,
  changeForgotPassword,
  changePassword,
  pushEvent,
} = require("../controllers/auth");

var router = express.Router();

router.post(
  "/signUp",
  [
    check("name", "Name should be more than 5 characters").isLength({ min: 5 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 chars").isLength({
      min: 3,
    }),
  ],
  signUp
);

router.post(
  "/signIn",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({
      min: 1,
    }),
  ],
  signIn
);

router.get("/verifyUser/:token", verifyUser);

router.post("/verify", [check("email", "email is required").isEmail()], verify);

router.post(
  "/reset-password",
  [
    check("oldPassword", "Old password is required"),
    check("newPassword", "New Password is required"),
    check("email", "email is required").isEmail(),
  ],
  resetPassword
);

router.get("/sign-out", signOut);

router.post(
  "/forgot-password",
  [check("email", "Email is required").isEmail()],
  forgotPassword
);

router.get("/forget-password-token/:token", changeForgotPassword);

router.post(
  "/chage-password",
  [
    check("password", "Password is required"),
    check("email", "Email is required").isEmail(),
  ],
  changePassword
);

module.exports = router;
