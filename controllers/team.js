const User = require("../models/user");
const Team = require("../models/team");
const { sendMail } = require("../utils/mail");
const { failAction } = require("../utils/response");

module.exports.createTeam = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(failAction(errors.array()[0]));
  }

  const { name, leaderId, totalTeamMember, eventId } = req.body;
  const verifyString = `${name}${leaderId}${totalTeamMember}${eventId}`;

  const team = new Team({
    name,
    leaderId,
    totalTeamMember,
    verifyString,
    eventId,
  });

  if (!req.user.hasPaidEntry) {
    return res.status(400).json(failAction("You have to pay entry fee first"));
  }

  if (!req.user.isProfileComplete) {
    return res.status(400).json(failAction("Your profile is not complete"));
  }

  try {
    await team.save((err, team) => {
      if (err) {
        return res.status(400).json(failAction(err));
      }

      return res.status(201).json(successAction(team));
    });
  } catch (err) {
    return res.status(400).json(failAction(err));
  }
};

/**
 * const uri = `https://api.techfestsliet.com/team/verify/${team.verifyString}`;

      team.members.forEach((member) => {
        sendMail({
          to: req.body.email,
          subject: "Verification Email",
          html: `<h3>Click on the link to verify your email: <br></h3>
            <p><a href=${uri}>Click here</a></p>`,
        });
      });
 */

module.exports.addTeamMember = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(failAction(errors.array()[0]));
  }

  const { teamId, memberId } = req.body;

  Team.findOneAndUpdate(
    { _id: teamId },
    { $push: { members: memberId } },
    (err, team) => {
      if (err || !team) {
        return res.status(400).json(failAction("Team not found"));
      }

      const uri = `https://api.techfestsliet.com/team/verify/${team.verifyString}`;

      sendMail({
        to: req.body.email,
        subject: "Verification Email",
        html: `<h3>Click on the link to verify your team Participation: <br></h3>
          <p><a href=${uri}>Click here</a></p>`,
      });

      return res.status(201).json(successAction(team));
    }
  );
};

module.exports.verifyParticipation = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(failAction(errors.array()[0]));
  }

  const { verifyString } = req.params;
  const _id = req.user._id;

  User.findOne({ _id: _id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json(failAction("User not found"));
    }
    if (!user.hasPaidEntry) {
      return res
        .status(400)
        .json(failAction("You have to pay entry fee first"));
    }
    if (!user.isProfileComplete) {
      return res.status(400).json(failAction("Your profile is not complete"));
    }

    Team.findOneAndUpdate(
      { verifyString: verifyString },
      { $push: { members: _id } },
      (err, team) => {
        if (err || !team) {
          return res.status(400).json(failAction("Team not found"));
        }

        return res.status(201).json(successAction(team));
      }
    );
  });
};

module.exports.deleteTeam = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(failAction(errors.array()[0]));
  }

  const { teamId } = req.body;

  Team.findOneAndDelete({ _id: teamId }, (err, team) => {
    if (err || !team) {
      return res.status(400).json(failAction("Team not found"));
    }

    return res.status(201).json(successAction("Team deleted successfully"));
  });
};
