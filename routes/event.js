const { check } = require("express-validator");
const {
  addEvents,
  getAllEvents,
  getEventById,
  getByDomain,
  deletEvent,
} = require("../controllers/events");
const isAuth = require("../middleware/isAuth");
const upload = require("../utils/upload");

const router = require("express").Router();
router.post("/addEvent", isAuth, upload.single("event"), addEvents);

router.get("/getAllEvents", getAllEvents);
router.get("/getByDomain/:name", getByDomain);
router.get("/getEventById", [check("id", "ID is required")], getEventById);
router.delete("/deleteEvent/:eId", isAuth, deletEvent);
module.exports = router;
