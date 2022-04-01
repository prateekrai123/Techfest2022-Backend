const Coordinator = require("../models/coordinator");
const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const { failAction, successAction } = require("../utils/response");
const fileHelper = require("../utils/file");

exports.createCoordinator = async (req, res, next) => {
  // return console.log(req.body.coordinatorDesignation);
  if (!req.file) {
    return res
      .status(208)
      .json({ isError: true, title: "Error", message: "Image is not given" });
  }
  const cc = await Coordinator.findOne({
    coordinatorEmail: req.body.coordinatorEmail,
  });
  if (cc) {
    if (req.file) {
      const pathImg = "upload/images/" + req.file.filename;
      fileHelper.deleteFiles(pathImg);
    }
    return res.status(208).json({
      isError: true,
      title: "Error",
      message: `Coordinator already exists with this mail ${req.body.coordinatorEmail}`,
    });
  }
  const {
    coordinatorName,
    coordinatorPhone,
    coordinatorEmail,
    coordinatorType,
    coordinatorDesignation,
  } = req.body;
  // return console.log(coordinatorType);

  const c1 = new Coordinator({
    coordinatorName: coordinatorName,
    coordinatorPhone: coordinatorPhone,
    coordinatorEmail: coordinatorEmail,
    coordinatorType: coordinatorType,
    coordinatorDesignation: coordinatorDesignation,
    photo: req.file.filename,
  });

  // console.log(req.file, req.body)

  c1.save((err, c1) => {
    if (err) {
      //err
      console.log(err);
      if (req.file) {
        const pathImg = "upload/images/" + req.file.filename;
        fileHelper.deleteFiles(pathImg);
      }
      return res.status(208).json({
        error: "error occurd, not able to saved in db ",
      });
    }
    return res.status(201).json({
      isError: false,
      title: "Success",
      message: "Coordinator saved!",
    });
  });
};

exports.getCoordinatorById = (req, res, next) => {
  const cid = req.params.cid;
  const errors = validationResult(req);

  //here cid should 12 bytes or  24 hex char
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  ///console.log(cid)
  Coordinator.findById(cid).then((c) => {
    //c is coordinator info
    if (!c) {
      return res.status(208).json({
        isError: true,
        title: "Error",
        message: "Plz first select something to update!",
      });
    }

    res.status(200).json({ isError: false, data: c });
  });
};

exports.updateCoordinator = (req, res, next) => {
  const cid = req.params.cid;

  const {
    coordinatorName,
    coordinatorPhone,
    coordinatorEmail,
    coordinatorType,
    coordinatorDesignation,
  } = req.body;

  let imageUrl = req.body.imageUrl;

  if (req.file) {
    imageUrl = req.file.filename;
  }

  // return console.log(cid, req.body);
  if (!imageUrl) {
    return res
      .status(208)
      .json({ isError: true, title: "Error", message: "Image is not given" });
  }

  Coordinator.updateOne(id).then((c) => {
    res.status(200).json({
      message: "get",
      c,
    });
  });
};

exports.getAllDetailsCoordinator = (req, res) => {
  Coordinator.find().then((c) => {
    if (!c) {
      return res.status(400).json({
        message: "Page not found! ",
      });
    }
    res.status(200).json({
      message: "succefully get all coordinators details ",
      c,
    });
    // console.log(c)
  });
};

exports.updateGetCoordinator = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const cid = req.params.cid;
  console.log(cid);
  Coordinator.findById(cid).then((err, c) => {
    if (err) {
      console.log("hi");
    }

    console.log(c);
  });
};

exports.deleteCoordinator = (req, res, next) => {
  const cid = req.params.cid;

  // return console.log(cid);

  Coordinator.findByIdAndDelete(cid)
    .then((result) => {
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
    })
    .catch((err) => {
      failAction("Not found! ");
    });
};

exports.imagePost = (req, res) => {
  return console.log(req.file.filename);
};

exports.getStudentCo = (req, res, next) => {
  Coordinator.find({ coordinatorType: "student" }).then((c) => {
    if (!c) {
      return res
        .status(208)
        .json({ isError: true, title: "Error", message: "Not found" });
    }
    return res
      .status(201)
      .json({ isError: false, title: "Success", message: "found", c: c });
  });
};

exports.getFacultyCo = (req, res, next) => {
  Coordinator.find({ coordinatorType: "faculty" }).then((c) => {
    if (!c) {
      return res
        .status(208)
        .json({ isError: true, title: "Error", message: "Not found!" });
    }
    return res
      .status(201)
      .json({ isError: false, title: "Success", message: "found", c: c });
  });
};
