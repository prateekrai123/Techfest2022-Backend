const express = require("express");
const {body} = require("express-validator");
const path = require('path');
const multer = require("multer");
const upload = require("../utils/upload");

const coordinatorController = require('../controllers/coordinator');
const Coordinator = require('../models/coordinator');

const router = express.Router();

router.post('/creating',upload.single('profile'),coordinatorController.createCoordinator);
router.get('/get_cordinator',coordinatorController.getCoordinatorById)

module.exports = router;

