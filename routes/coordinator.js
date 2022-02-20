const express = require("express");
const {body} = require("express-validator");
const path = require('path');
const multer = require("multer");
const upload = require("../utils/upload");

const coordinatorController = require('../controllers/coordinator');
const Coordinator = require('../models/coordinator');

const router = express.Router();

//GET, PUT, POST localhost:4000/api/coordinator
router.post('/creating',upload.single('profile'),coordinatorController.createCoordinator);
router.get('/get/:cid',
[
    body('Bad request! ')
    
]

,coordinatorController.getCoordinatorById);

router.get('/get-all-details',coordinatorController.getAllDetailsCoordinator);

router.put('/update/:cid', coordinatorController.updateCoordinator);
router.delete('/delete/:cid', coordinatorController.deleteCoordinator);

module.exports = router;

