import { validationResult } from 'express-validator'
import user from '../models/user'
const User = require('../models/user')
const {failAction, successAction} = require('../utils/response')

exports.signIn = (req, res) => {
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