const { failAction, successAction } = require("../utils/response");
const User = require("../models/user");
const { validationResult } = require("express-validator");
const { findById } = require("../models/user");
const Event = require("../models/events");
const Workshop = require("../models/workshop");
module.exports.getReferralCode = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(failAction(errors.array()[0]));
  }

  const { _id } = req.body.id;
  User.findById(_id, (err, user) => {
    if (err || !user) {
      return res.status(404).status(failAction("User not found"));
    }

    return res.status(201).json(successAction(user.referralCode));
  });
};

module.exports.getUserById = (req, res) => {
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   return res.status(400).json(failAction(errors.array()[0]));
  // }
  const _id = req.userId;
  // const { _id } = req.user._id;

  User.findOne({ _id: _id })
    .populate("events", ["name", "endDate"])
    .populate("workshops", ["workshopName", "endDate"])
    .exec((err, user) => {
      if (err || !user) {
        return res.status(208).json({ isError: true, message: "Not auth" });
      }
      user.password = null;

      return res
        .status(200)
        .json({ isError: false, isSuccess: true, user: user });
    });
};

module.exports.getAllUsers = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(failAction(errors.array()[0]));
  }

  User.find({}, (err, users) => {
    if (err || !users) {
      return res.status(404).json(failAction("No users found"));
    }

    return res.status(201).json(successAction(users));
  });
};

module.exports.getUserByEmail = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(failAction(errors.array()[0]));
  }

  const { email } = req.body.email;

  User.findOne({ email: email }, (err, user) => {
    if (err || !user) {
      return res.status(404).status(failAction("User not found"));
    }

    return res.status(201).json(successAction(user));
  });
};

module.exports.pushEvent = async (req, res) => {
  const userId = req.userId;
  const event = req.body;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(208).json({
      isError: true,
      title: "Event Error",
      message: "User not found!",
    });
  }

  const eventExisted = await Event.findById(event._id);
  if (!eventExisted) {
    return res.status(208).json({
      isError: true,
      title: "Event Error",
      message: "Event not found!",
    });
  }
  if (
    eventExisted.eventMode === "offline" &&
    user.paymentDetails.subscriptionType !== "599"
  ) {
    return res.status(208).json({
      isError: true,
      title: "Payment Error",
      message: "This mode is for Gold subscription users!",
    });
  }
  const eventsListed = user.events.map((e) => {
    return e._id.toString();
  });

  if (eventsListed.indexOf(event._id.toString()) !== -1) {
    return res.status(208).json({
      isError: true,
      title: "Event Exist",
      message: "Event Already Added",
    });
  }

  User.findOneAndUpdate(
    { _id: user._id },
    { $push: { events: event } },
    (err, user) => {
      if (err || !user) {
        return res.status(208).json({
          isError: false,
          title: "Error",
          message: "Cannot add event",
        });
      }

      return res
        .status(201)
        .json({ isError: true, title: "Success", message: "Event is added" });
    }
  );
};

module.exports.pushWorkshop = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(208).json(failAction(errors.array()[0]));
  }

  const { workshop } = req.body;
  // return console.log(workshop);
  const userId = req.userId;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(208).json({ isError: true, message: "User not found!" });
  }
  const workshopExisted = await Workshop.findById(workshop._id);
  if (!workshopExisted) {
    return res.status(208).json({
      isError: true,
      title: "Workshop Error",
      message: "Workshop not found!",
    });
  }
  if (
    workshopExisted.workshopMode === "offline" &&
    user.paymentDetails.subscriptionType !== "599"
  ) {
    return res.status(208).json({
      isError: true,
      title: "Payment Error",
      message: "This mode is for Gold subscription users!",
    });
  }
  const workshopsListed = user.workshops.map((w) => {
    return w._id.toString();
  });

  if (workshopsListed.indexOf(workshop._id.toString()) !== -1) {
    return res.status(208).json({
      isError: true,
      title: "Workshop Exist",
      message: "Workshop Already Added",
    });
  }
  user.workshops.forEach((ws) => {
    if (ws.id == workshop.id) {
      return res.status(400).json({
        isError: true,
        title: "Error",
        message: "Workshop Already Added",
      });
    }
  });

  User.findOneAndUpdate(
    { _id: user._id },
    { $push: { workshops: workshop } },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          isError: true,
          title: "Error",
          message: "Cannot add workshop",
        });
      }

      return res.status(201).json({
        isError: false,
        title: "Success",
        message: "Workshop is added",
      });
    }
  );
};

exports.getVerifyUserWbe = (req, res) => {
  res.render("verifyuser");
};

module.exports.updateUser = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(failAction(errors.array()[0]));
  }

  const { email, phone, dob, whatsappPhoneNumber } = req.body.data;

  let isProfileCompplete = true;

  if (!phone || !dob || !whatsappPhoneNumber) {
    isProfileCompplete = false;
  } else {
    isProfileCompplete = true;
  }

  User.findOneAndUpdate(
    { email: email },
    { $set: req.body.data, $set: { isProfileCompplete: isProfileCompplete } },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json(failAction("Cannot update user"));
      }

      return res.status(201).json(successAction(user));
    }
  );
};
