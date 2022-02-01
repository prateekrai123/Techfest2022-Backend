const { validationResult } = require("express-validator");
const user = require("../models/user");
const User = require("../models/user");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { failAction, successAction } = require("../utils/response");
const verifyToken = require("../models/verifyToken");
const mail = require("../utils/mail");

exports.signIn = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty) {
    return res.status(400).json({
      error: failAction(errors.array()[0].msg),
    });
  }

  const { email, password } = req.body;

  User.findOne({ email }, async (err, user) => {
    if (err || !user) {
      return res.status(404).json({
        error: failAction("The email is not registered"),
      });
    }

    if (!user.isVerified) {
      return res.status(400).json(failAction("The user is not verified"));
    }

    try {
      const condition = await bcrypt.compare(password, user.password);
      if (condition) {
        const token = await jwt.sign(
          { id: user._id, role: user.role },
          process.env.ACCESS_TOKEN_SECRET
        );
        res.cookie("token", token, { expire: new Date() + 1000 });
        return res.status(200).json(
          successAction({
            user: {
              user,
            },
          })
        );
      } else {
        return res.status(400).json(failAction("The credentials are wrong"));
      }
    } catch (error) {
      return res.status(500);
    }
  });
};

exports.signUp = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty) {
    return res.status(422).json(failAction(errors.array()[0].msg));
  }

  if (await User.findOne({ email: req.body.email })) {
    return res.status(400).json(failAction("The Email is already registered"));
  }
  const uid = uuid.v4();
  const eArr = req.body.email.split("@");
  const domain = eArr[1];
  const userId = `#TF-${uid}${Date.now().toString()}${eArr[0]}`;
  const password = req.body.password;
  let payload;

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    if (domain === "sliet.ac.in") {
      payload = {
        ...{
          email: req.body.email,
          name: req.body.name,
          verificationCode: uuid.v4(),
          password: encryptedPassword.toString,
          collegeName: "Sant Longowal Institute of Engineering and Technology",
          userId: userId,
          regNo: eArr[0],
          hasPaidEntry: true,
        },
      };
    } else {
      payload = {
        ...{
          email: req.body.email,
          name: req.body.name,
          userId: userId,
          password: encryptedPassword,
          verificationCode: uuid.v4(),
        },
      };
    }
  } catch (error) {
    return res.status(500);
  }

  const user = new User(payload);

  user.save((err, user) => {
    if (err) {
      return res
        .status(400)
        .json(failAction("Error in SignUp. Some error occurred"));
    } else {
      return res.status(200).json(successAction("The user is inserted"));
    }
  });
};

exports.verify = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(
      failAction({
        error: errors.array[0].msg,
      })
    );
  }

  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err || !user) {
      return res.status(400).json(failAction("The user is not registered"));
    }
    try {
      const token = crypto.randomBytes(32).toString("hex");

      await verifyToken({
        token: token,
        email: req.body.email,
      }).save();

      const uri = `http://localhost:4000/verifyUser/${token}`;

      mail.sendMail({
        to: req.body.email,
        subject: "Verification Email",
        html: `<h3>Click on the link to verify your email: <br></h3>
        <p><a href=${uri}>Click here</a></p>`,
      });

      res
        .status(200)
        .json(successAction("The verification email is successfully sent"));
    } catch (err) {
      return res.status(400).json(failAction(err));
    }
  });
};

module.exports.verifyUser = async (req, res) => {
  const token = await req.params.token;
  if (token) {
    const verify = await verifyToken.findOne({ token: token });
    if (verify) {
      let user = await User.findOne({ email: verify.email });
      user.isVerified = true;
      await user.save();
      await verifyToken.findOneAndDelete({ token: token });
      return res.status(200).json(successAction("The user is verified"));
    } else {
      return res.status(404).json(failAction("The token is expired"));
    }
  } else {
    return res.status(404).json(failAction("Cannot get token"));
  }
};

module.exports.resetPassword = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(failAction(errors.array()[0]));
  }

  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err || !user) {
      return res.status(404).json(failAction("User not found"));
    } else {
      try {
        const condition = await bcrypt.compare(
          req.body.oldPassword,
          user.password
        );
        if (condition) {
          const encryptedPassword = (
            await bcrypt.hash(req.body.oldPassword, 10)
          ).toString();
          User.findOneAndUpdate(
            { user: user.userId },
            { $set: { password: encryptedPassword } },
            (err, user) => {
              if (err && !user) {
                console.log(err);
                return res
                  .status(404)
                  .json(failAction("Cannot update password"));
              } else {
                return res
                  .status(200)
                  .json(successAction("Password is changed"));
              }
            }
          );
        } else {
          return res
            .status(400)
            .json(failAction("The email is not registered"));
        }
      } catch (err) {
        return res.status(400).json(failAction("Cannot update password"));
      }
    }
  });
};

module.exports.signOut = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json(successAction("Signed Out successfully"));
};

exports.forgotPassword = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(failAction(errors.array()[0]));
  }

  const { email } = req.body.email;

  User.findOne({ email: email }, async (err, user) => {
    if (err || !user) {
      res.status(400).json(failAction("The email is not registered"));
    }
    try {
      const token = crypto.randomBytes(32).toString("hex");

      await verifyToken({
        token: token,
        email: req.body.email,
      }).save();

      const uri = `http://localhost:4000/verifyUser/${token}`;

      mail.sendMail({
        to: req.body.email,
        subject: "Forgot Password Email",
        html: `<h3>Click on the link to verify your email: <br></h3>
        <p><a href=${uri}>Click here</a></p>`,
      });

      res
        .status(200)
        .json(successAction("The verification email is successfully sent"));
    } catch (err) {
      return res.status(400).json(failAction(err));
    }
  });
};

exports.changeForgotPassword = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(failAction(errors.array()[0]));
  }

  const token = req.params.token;

  let email;

  verifyToken.findOne({ token: token }, async (err, res) => {
    if (err || !res) {
      return res
        .status(401)
        .json(failAction("Token not found or token expired"));
    }

    try {
      email = res.email;
    } catch (err) {
      return res.status(404).json("Some error occured");
    }
  });
};
