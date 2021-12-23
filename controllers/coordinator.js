
const Coordinator = require('../models/coordinator');
const {validationResult} = require('express-validator');
const path = require('path');
const multer = require("multer");


exports.createCoordinator = (req, res, next)=>{

   const {coordinatorName, coordinatorPhone, coordinatorEmail, coordinatorType, coordinatorDesignation} = req.body;
    console.log(req.file, req.body)
    
    const c1 = new Coordinator({
        coordinatorName:coordinatorName,
        coordinatorPhone:coordinatorPhone,
        coordinatorEmail:coordinatorEmail,
        coordinatorType:coordinatorType,
        coordinatorDesignation:coordinatorDesignation,
        photo:req.file.filename
    })

    c1.save((err, c1)=>{
        if(err){
            //err
            console.log(err)
            return res.status(400).json({
                error:"error ocurd, no able to saved in db "
            })
        }
        res.status(201).json({
            message :"coordinator created successfully! ",
            c1
        })
    })
}

exports.getCoordinatorById = (req, res, next)=>{
    const id = req.query.cid;
    Coordinator.findById(id).then((c)=>{  //c is coordinator info
        res.status(200).json({
            message:"get",
            c
        })
    })
}