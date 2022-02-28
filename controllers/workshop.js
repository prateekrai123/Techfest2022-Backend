const Workshop = require("../models/workshop");
const { successAction, failAction } = require("../utils/response");
const { validationResult } = require("express-validator");
const fileHelper = require("../utils/file");

exports.getWorkshop = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { wId } = req.params;
  Workshop.findById(wId).then((w) => {
    if (!w) {
      // console.log(err)
      return res.status(404).json({
        error: "Not Found! ",
      });
    }

    res.status(200).json({
      message: "get successfully",
      w,
    });
  });
};

exports.createWorkshop = (req, res) => {
  console.log("clicked");
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const {
    wsName,
    wsDesc,
    hostDesc,
    hostName,
    startDate,
    endDate,
    studentCoordinator,
  } = req.body;

  console.log(wsName, studentCoordinator);
  //let studentCoordinatorArr = studentCoordinator.split(",");
  // Workshop.findOne({ workshopName: wsName }, (err, w) => {
  //   if (err) {
  //     return res.status(422).json(failAction(err));
  //   }
  //   if (w) {
  //     const pathImg = "upload/images/" + req.file.filename;
  //     fileHelper.deleteFiles(pathImg);
  //     return res.status(422).json(failAction("Workshop already exists", 422));
  //   } else {
  //     const w1 = new Workshop({
  //       workshopName: wsName,
  //       wsDesc: wsDesc,
  //       hostName: hostName,
  //       hostDesc: hostDesc,
  //       startDate: startDate,
  //       endDate: endDate,
  //       // studentCoordinator: studentCoordinatorArr,
  //       photo: req.file.filename,
  //     });
  //     try {
  //       w1.save((err, w1) => {
  //         if (err || !w1) {
  //           return res.status(400).json({
  //             error: err,
  //           });
  //         } else {
  //           return res
  //             .status(201)
  //             .json(successAction(w1, "Workshop created successfully!", 201));
  //         }
  //       });
  //     } catch (err) {
  //       return res.status(400).json(
  //         failAction(err, 400)
  //         // error: err,
  //       );
  //     }
  //   }
  // });
};

exports.getAllWokshop = (req, res) => {
  Workshop.find().then((w) => {
    if (!w) {
      return res.status(400).json({
        message: "Page not found! ",
      });
    }
    res.status(200).json({
      message: "succefully get all coordinators details ",
      w,
    });
    // console.log(c)
  });
};

exports.deleteWorkshop = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // const err = errors.array();
    return res.status(422).json(failAction(errors.array(), 422));
  }
  const wId = req.params.wId;
  try {
    Workshop.findByIdAndDelete(wId).then((result) => {
      if (!result) {
        res.status(404).json(failAction("Not found! ", 404));
      } else {
        //images logic

        const pathImg = "upload/images/" + result.photo;
        fileHelper.deleteFiles(pathImg);
        res.status(410).json(
          successAction({
            data: result,
            statusCode: 410,
            message: "successfully deleted! ",
          })
        );
      }
    });
  } catch (err) {
    res.status(404).json(failAction(err, 404));
  }
};
