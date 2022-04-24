const { check } = require("express-validator");
const {
  addEvents,
  getAllEvents,
  getEventById,
  getByDomain,
  deletEvent,
  getProperEvents,
  getTeamsByEventName,
} = require("../controllers/events");
const isAdmin = require("../middleware/isAdmin");
const isAuth = require("../middleware/isAuth");

const upload = require("../utils/upload");

const router = require("express").Router();
router.post("/addEvent", isAuth, isAdmin, upload.single("event"), addEvents);
router.get("/getProperEvent", isAuth, getProperEvents);
router.get("/getAllEvents", getAllEvents);
router.get("/getByDomain/:name", getByDomain);
router.get("/getEventById", [check("id", "ID is required")], getEventById);
router.delete("/deleteEvent/:eId", isAuth, isAdmin, deletEvent);
router.get("/getTeams", check("id", "id is required"), getTeamsByEventName);

module.exports = router;
