const { validationResult } = require("express-validator");
const Event = require("../models/events");
const { successAction, failAction } = require("../utils/response");
const fileHelper = require("../utils/file");

module.exports.addEvents = (req, res) => {
  if (!req.file) {
    return res
      .status(208)
      .json({ isError: true, title: "Error", message: "Image not given" });
  }

  const errors = validationResult(req);

  // return console.log(errors.array());
  if (!errors.isEmpty()) {
    if (req.file) {
      const pathImg = "upload/images/" + req.file.filename;
      fileHelper.deleteFiles(pathImg);
    }
    return res
      .status(208)
      .json({ isError: true, title: "Error", message: errors.array() });
  }

  const {
    name,
    description,
    date,
    time,
    eventMode,
    domain,
    studentCoordinator,
  } = req.body;
  const photo = req.file.filename;
  let studentCoordinatorArr = studentCoordinator.split(",");

  Event.findOne({ name: name }, (err, event) => {
    if (err) {
      if (req.file) {
        const pathImg = "upload/images/" + req.file.filename;
        fileHelper.deleteFiles(pathImg);
      }
      return res
        .status(208)
        .json({ isError: true, title: "Error", message: err });
    }
    if (event) {
      if (req.file) {
        const pathImg = "upload/images/" + req.file.filename;
        fileHelper.deleteFiles(pathImg);
      }
      return res.status(208).json({
        isError: true,
        title: "Error",
        message: "Event already exists",
      });
    } else {
      const payload = {
        name,
        description,
        photo,
        date,
        time,
        eventMode,
        domain,
        studentCoordinator: studentCoordinatorArr,
      };

      const event = new Event(payload);

      try {
        event.save((err, event) => {
          if (err || !event) {
            if (req.file) {
              const pathImg = "upload/images/" + req.file.filename;
              fileHelper.deleteFiles(pathImg);
            }
            return res.status(208).json({
              isError: true,
              title: "Error",
              message: "Error ocurd while saving db",
              error: err,
            });
          } else {
            return res.status(200).json({
              isError: false,
              title: "Error",
              message: "Event is added",
            });
          }
        });
      } catch (err) {
        if (req.file) {
          const pathImg = "upload/images/" + req.file.filename;
          fileHelper.deleteFiles(pathImg);
        }
        return res
          .status(208)
          .json({ isError: true, title: "Error", message: err });
      }
    }
  });
};

module.exports.getAllEvents = (req, res) => {
  Event.find()
    .populate("studentCoordinator", ["coordinatorName", "coordinatorEmail"])
    .exec((err, events) => {
      if (err || !events) {
        return res.status(208).json(failAction(err));
      }
      return res.status(200).json({
        isError: false,
        title: "Succes",
        message: "succes",
        data: events,
      });
    });
};

exports.getByDomain = (req, res, next) => {
  const name = req.params.name.trim().toLowerCase();
  //return console.log(name);
  Event.find({ domain: name }).then((d) => {
    if (!d) {
      return res.status(200).json({
        isError: true,
        title: "Error",
        message: "Not found",
      });
    }

    return res.status(200).json({
      isError: false,
      title: "Succes",
      message: "succes",
      data: d,
    });
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

exports.deletEvent = (req, res, next) => {
  const eId = req.params.eId;

  Event.findByIdAndDelete().then((result) => {
    if (!result) {
      res.status(208).json({
        isError: true,
        title: "Error",
        message: "Image is not given",
      });
    }
    const pathImg = "upload/images/" + result.photo;
    if (fs.existsSync(pathImg)) {
      fileHelper.deleteFiles(pathImg);
    } //photo exists

    res.status(208).json({
      data: result,
      statusCode: 410,
      message: "successfully deleted! ",
    });
  });
};
