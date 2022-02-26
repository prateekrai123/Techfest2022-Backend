const { validationResult } = require("express-validator");
const Event = require("../models/events");
const { successAction, failAction } = require("../utils/response");

module.exports.addEvents = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, description, photo, date, time, studentCoordinator } = req.body;

  Event.findOne({ name: name }, (err, event) => {
    if (err) {
      return res.status(422).json(failAction(err));
    }
    if (event) {
      return res.status(422).json(failAction("Event already exists"));
    } else {
      const payload = {
        name,
        description,
        photo,
        date,
        time,
        studentCoordinator,
      };

      const event = new Event(payload);

      try {
        event.save((err, event) => {
          if (err || !event) {
            return res.status(400).json({
              error: err,
            });
          } else {
            return res.status(200).json(successAction("Event is added"));
          }
        });
      } catch (err) {
        return res.status(400).json({
          error: err,
        });
      }
    }
  });
};

module.exports.getEvents = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Event.find({}, (err, events) => {
    if (err || !events) {
      return res.status(400).json(failAction(err));
    }
    return res.status(200).json(successAction(events));
  });
};

module.exports.getEventById = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  Event.findById(req.body.id, (err, event) => {
    if (err || !event) {
      return res.status(400).json(failAction("Event does not exists"));
    }
    return res.status(200).json(successAction(event));
  });
};
