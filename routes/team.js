const { check } = require("express-validator");

const {
  verifyParticipation,
  createTeam,
  addTeamMember,
  deleteTeam,
  addTeamMembersMail,
  getTeams,
  getProperTeams,
  getTeamById,
} = require("../controllers/team");
const isAuth = require("../middleware/isAuth");
const router = require("express").Router();

router.post("/createTeam", isAuth, createTeam);

router.post("/addTeamMemberMail", isAuth, addTeamMember);
router.get("/getAllTeams", getTeams);
router.get("/getTeams", isAuth, getProperTeams);
router.post("/teamById", getTeamById);

module.exports = router;
