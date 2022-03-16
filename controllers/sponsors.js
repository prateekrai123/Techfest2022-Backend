const Sponsors = require("../models/sponsors");
const { failAction, successAction } = require("../utils/response");
const { validationResult } = require("express-validator");
const fileHelper = require("../utils/file");

module.exports.addSponsor = (req, res) => {
  const errors = validationResult(req);
  if (!req.file) {
    return res
      .status(208)
      .json({ isError: true, title: "true", message: "Image is not given" });
  }
  if (!errors.isEmpty()) {
    if (req.file) {
      const pathImg = "upload/images/" + req.file.filename;
      fileHelper.deleteFiles(pathImg);
    }
    return res
      .status(208)
      .json({ isError: true, title: "Error", message: errors.array()[0] });
  }

  const { name, link } = req.body;

  return console.log(name);

  const sponsor = new Sponsors({
    title: name,
    link,
    imageSrc: req.file.filename,
  });

  sponsor.save((err, sponsor) => {
    if (err) {
      if (!req.file) {
        return res.status(208).json({
          isError: true,
          title: "true",
          message: "Image is not given",
        });
      }
      return res
        .status(208)
        .json({ isError: true, title: "true", message: err });
    }

    return res
      .status(201)
      .json({ isError: false, title: "Success", message: "Sponser added!" });
  });
};

module.exports.getAllSponsors = (req, res) => {
  Sponsors.find({}, (err, sponsors) => {
    if (err || !sponsors) {
      return res.status(208).json({
        isError: true,
        title: "Error",
        message: "No sponsors found",
        data: [],
      });
    }

    return res.status(201).json({ isError: false, data: sponsors });
  });
};
