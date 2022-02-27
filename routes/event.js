const { check } = require("express-validator");
const { addEvents, getEvents, getEventById } = require("../controllers/events");

const router = require("express").Router();

router.post(
  "/addEvent",
  [
    check("name", "name is required"),
    check("description", "description is required"),
    check("date", "date is required"),
    check("time", "time is required"),
    check("studentCoordinator", "studentCoordinator is required"),
  ],
  addEvents
);

router.get("/getEvents", getEvents);

router.get("/getEventById", [check("id", "ID is required")], getEventById);

module.exports = router;
