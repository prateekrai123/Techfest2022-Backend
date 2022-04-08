const { validationResult } = require("express-validator");
const Team = require("../models/team");
const User = require("../models/user");

module.exports.createTeam = (req, res) => {
  const errors = validationResult(req.body);

  if (!errors.isEmpty()) {
    return res.status(200).json({ isError: true, message: errors[0].msg });
  }

  const { name, leaderId, event, members } = req.body;

  let teamMembers = [];
  console.log(members);
  const err = false;

  members.map((element) => {
    User.findOne({ email: element }, (err, user) => {
      if (err || !user) {
        err = true;
      }

      teamMembers.push({
        email: user.email,
        status: "pending",
      });
    });
  });
  if (err) {
    return res.status(200).json({ isError: true, message: err });
  }

  console.log(teamMembers);

  const team = new Team({
    name: name,
    leaderId: leaderId,
    event: event,
    members: teamMembers,
  });

  team.save((err, team) => {
    if (err || !team) {
      return res
        .status(200)
        .json({ isError: true, message: "Cannot create team" });
    } else {
      return res.status(200).json({
        isError: false,
        message: "Team Created successfully",
        team: team,
      });
    }
  });
};

module.exports.getTeamById = (req, res) => {
  const { id } = req.body;

  Team.findById(id, (err, team) => {
    if (err || !team) {
      return res
        .status(200)
        .json({ isError: true, message: "Cannot find team" });
    } else {
      return res.status(200).json({ isError: false, team });
    }
  });
};
