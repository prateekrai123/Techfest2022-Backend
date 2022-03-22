const { check } = require("express-validator");
const {
  getAllSponsors,
  addSponsor,
  deleteSponsor,
} = require("../controllers/sponsors");
const isAuth = require("../middleware/isAuth");
const upload = require("../utils/upload");

const router = require("express").Router();

router.get("/getAllSponsors", getAllSponsors);

router.post(
  "/addSponsor",
  isAuth,
  [
    check("name", "name is required").isEmpty(),
    check("link", "link is required"),
  ],
  upload.single("sponserImg"),
  addSponsor
);

router.delete("/delete/:sId", deleteSponsor);

module.exports = router;
