const { failAction, successAction } = require("../utils/response");

module.exports.getUserById = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(failAction(errors.array()[0]));
  }

  const { _id } = req.body.id;

  User.findOne({ _id: _id }, (err, user) => {
    if (err || !user) {
      return res.status(404).status(failAction("User not found"));
    }

    return res.status(201).json(successAction(user));
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
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(failAction(errors.array()[0]));
  }

  const { event } = req.body;

  const user = req.user;

  if (!user.hasPaidEntry) {
    return res.status(400).json(failAction("You have to pay entry fee first"));
  }

  if (!user.isProfileComplete) {
    return res
      .status(400)
      .json(failAction("You have to complete your profile first"));
  }

  user.events.forEach((ev) => {
    if (ev.id == event.id) {
      return res.status(400).json(failAction("Event Already Added"));
    }
  });

  User.findOneAndUpdate(
    { _id: user._id },
    { $push: { events: event } },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json(failAction("Cannot add event"));
      }

      return res.status(201).json(successAction("Event is added"));
    }
  );
};

module.exports.pushWorkshop = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(failAction(errors.array()[0]));
  }

  const { workshop } = req.body;

  const user = req.user;

  if (!user.hasPaidEntry) {
    return res.status(400).json(failAction("You have to pay entry fee first"));
  }

  if (!user.isProfileComplete) {
    return res
      .status(400)
      .json(failAction("You have to complete your profile first"));
  }

  user.workshops.forEach((ws) => {
    if (ws.id == workshop.id) {
      return res.status(400).json(failAction("Workshop Already Added"));
    }
  });

  User.findOneAndUpdate(
    { _id: user._id },
    { $push: { workshops: workshop } },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json(failAction("Cannot add workshop"));
      }

      return res.status(201).json(successAction("Workshop is added"));
    }
  );
};
