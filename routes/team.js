const { check } = require("express-validator");
const {
  verifyParticipation,
  createTeam,
  addTeamMember,
  deleteTeam,
} = require("../controllers/team");
const router = require("express").Router();

router.post(
  "/createTeam",
  [
    check("name", "Team name is required").not().isEmpty(),
    check("leaderId", "Leader id is required").not().isEmpty(),
    check("totalTeamMember", "Total team member is required").not().isEmpty(),
    check("eventId", "Event id is required").not().isEmpty(),
  ],
  createTeam
);

router.post(
  "/addTeamMember",
  [
    check("teamId", "Team id is required").not().isEmpty(),
    check("memberId", "Member id is required").not().isEmpty(),
  ],
  addTeamMember
);

router.get("/verify/:verifyString", verifyParticipation);

router.post(
  "/delete",
  [check("teamId", "Team id is required").not().isEmpty()],
  deleteTeam
);

module.exports = router;
