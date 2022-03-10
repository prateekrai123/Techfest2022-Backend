const Sponsors = require("../models/sponsors");
const { failAction, successAction } = require("../utils/response");

module.exports.addSponsor = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(failAction(errors.array()[0]));
  }

  const { name, photo, link } = req.body;

  const sponsor = new Sponsors({
    name,
    photo,
    link,
  });

  sponsor.save((err, sponsor) => {
    if (err) {
      return res.status(400).json(failAction(err));
    }

    return res.status(201).json(successAction(sponsor));
  });
};

module.exports.getAllSponsors = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(failAction(errors.array()[0]));
  }

  Sponsors.find({}, (err, sponsors) => {
    if (err || !sponsors) {
      return res.status(404).json(failAction("No sponsors found"));
    }

    return res.status(201).json(successAction(sponsors));
  });
};
