const Coordinator = require("../models/coordinator");
const { validationResult } = require("express-validator");
const path = require("path");
const multer = require("multer");
const { json } = require("body-parser");
const { failAction, successAction } = require("../utils/response");
const fileHelper = require("../utils/file");

exports.createCoordinator = (req, res, next) => {
  const {
    coordinatorName,
    coordinatorPhone,
    coordinatorEmail,
    coordinatorType,
    coordinatorDesignation,
  } = req.body;
  // return console.log(coordinatorName);

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
      return res.status(400).json({
        error: "error occurd, not able to saved in db ",
      });
    }
    res.status(201).json({
      message: "coordinator created successfully! ",
      c1,
    });
  });
};

exports.getCoordinatorById = (req, res, next) => {
  const cid = req.params.cid;
  const errors = validationResult(req);

  //here cid should 12 bytes or  24 hex char

  ///console.log(cid)
  Coordinator.findById(cid).then((c) => {
    //c is coordinator info
    if (!c) {
      return res.status(400).json(failAction("not found"));
    }

    res.status(200).json(successAction({ data: c }));
  });
};

exports.updateCoordinator = (req, res) => {
  const cid = req.params.cid;
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

  Coordinator.findByIdAndDelete(cid)
    .then((result) => {
      if (!result) {
        res.status(404).json(failAction("Not found! "));
      }
      const pathImg = "upload/images/" + result.photo;
      fileHelper.deleteFiles(pathImg);
      res.status(410).json(
        successAction({
          data: result,
          statusCode: 410,
          message: "successfully deleted! ",
        })
      );
    })
    .catch((err) => {
      failAction("Not found! ");
    });
};
