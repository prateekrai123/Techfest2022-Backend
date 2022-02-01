const Domain = require('../models/domain');
const {validationResult } = require('express-validator');


//creating domain 

exports.createDomain = (req, res)=>{

    const {domainName, domainInfo, studentCoordinator, facultyCoordinator} = req.body;
    //const dn = req.body.domainName;
   

    
    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     return res.status(422)
    //     .send("sholdnt be empty");
    // }

     //splitting through , 
     let studentCoordinatorArr = studentCoordinator.split(",");
     let facultyCoordinatorArr = facultyCoordinator.split(",");

  //   console.log(studentCoordinatorArr);

    let domain = new Domain({
        domainName:domainName, 
        domainInfo:domainInfo,
         studentCoordinator:studentCoordinatorArr, 
         facultyCoordinator:facultyCoordinatorArr,
         photo:req.file.filename
    }) 
 // console.log(domain)
    domain.save((err, domain)=>{
        if(err){
            //err
            console.log(err)
            return res.status(400).json({
                error:"error ocurd, no able to saved in db "
            })
        }
        res.json({
            message :"domain created successfully! ",
            domain
        })
    })


}

exports.getDomain = (req, res, next) =>{



}

