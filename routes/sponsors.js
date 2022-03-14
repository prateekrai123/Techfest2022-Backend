const { check } = require("express-validator");
const { getAllSponsors, addSponsor } = require("../controllers/sponsors");
const upload = require("../utils/upload");

const router = require("express").Router();

router.get("/getAllSponsors", getAllSponsors);

router.post(
  "/addSponsor",
  [check("name", "name is required"), check("link", "link is required")],
  upload.single("sponserImg"),
  addSponsor
);

module.exports = router;
