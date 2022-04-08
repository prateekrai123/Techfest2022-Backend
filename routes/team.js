const { check } = require("express-validator");
const {
  verifyParticipation,
  createTeam,
  addTeamMember,
  deleteTeam,
  addTeamMembersMail,
  getTeamById,
} = require("../controllers/team");
const router = require("express").Router();

router.post(
  "/createTeam",
  [
    check("name", "Team name is required").not().isEmpty(),
    check("leaderId", "Leader id is required").not().isEmpty(),
    check("eventId", "Event id is required").not().isEmpty(),
  ],
  createTeam
);

router.post("/teamById", getTeamById);

module.exports = router;
