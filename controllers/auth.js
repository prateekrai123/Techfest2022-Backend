import { validationResult } from 'express-validator'
import user from '../models/user'
const User = require('../models/user')
const uuid = require('uuid')
const {failAction, successAction} = require('../utils/response')

exports.signIn = async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty){
        return res.status(400).json({
            error: failAction(errors.array()[0].msg)
        })
    }

    const {email, password} = req.body()

    User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.status(404).json({
                error: failAction("The email is not registered")
            })
        }
    })

    if(await bcrypt.compare(password, user.password)){
        return res.status(200).json(
            successAction({
                user: {
                    user 
                }
            })
        )
    }
    else{
        return res.status(400).json(
            failAction("The credentials are wrong")
        )
    }
    
}

exports.signUp = async(req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty){
        return res.status(422).json(
            failAction(errors.array()[0].msg)
        )
    }

    if(await User.findOne({email: req.body.email})){
        return res.status(400).json(
            failAction("The Email is already registered")
        )
    }

    const uid = uuid.v4()
    const eArr = req.body.email.split("@")
    const domain = eArr[1];
    const userId = `#TF-${uid}${Date.now().toString()}${eArr[0]}`
    let payload;

    if(domain === "sliet.ac.in"){
        payload = {
            ...req.body, ...{
                verificationCode: uuid.v4(),
                collegeName: "Sant Longowal Institute of Engineering and Technology",
                userId: userId,
                regNo : eArr[0],
                hasPaidEntry: true
            }
        }
    }
    else{
        payload = {
            ...req.body, ...{
                userId: userId,
                verificationCode: uuid.v4()
            }
        }
    }

    const user = new User(payload)

    user.save((err, user) => {
        if(err){
            return res.status(400).json(
                failAction("Error is SignUp. Some error occurred")
            )
        }
        else{
            //send verification link to user's email
        }
    })
}