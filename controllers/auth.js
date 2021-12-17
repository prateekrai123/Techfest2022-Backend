import { validationResult } from 'express-validator'
const User = require('../models/user')
const {failAction} = require('../utils/response')

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
}