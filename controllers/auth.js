const { validationResult } = require("express-validator");
const user = require("../models/user");
const User = require("../models/user");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const { failAction, successAction } = require("../utils/response");

exports.signIn = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty) {
    return res.status(400).json({
      error: failAction(errors.array()[0].msg),
    });
  }

  const { email, password } = req.body;

  User.findOne({ email }, async(err, user) => {
    if (err || !user) {
      return res.status(404).json({
        error: failAction("The email is not registered"),
      });
    }

    try {
      const condition = await bcrypt.compare(password, user.password)
      if (condition) {
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
      return res.status(500)
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
    console.log(encryptedPassword);
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
      console.log(err);
      return res
        .status(400)
        .json(failAction("Error is SignUp. Some error occurred"));
    } else {
      res.send(200).json(successAction("The user is inserted"));
    }
  });
};

exports.verify = (req, res) => {
  const errors = validationResult(req);
  
  if(!errors.isEmpty()){
    return res.status(422).json(
      failAction({
        error : errors.array[0].msg
      })
    )
  }
}
