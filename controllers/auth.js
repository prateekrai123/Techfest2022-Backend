import { validationResult } from 'express-validator'
import User from '../models/user'

exports.signIn = (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty){
        return res.status(400).json({
            error: errors.array()[0].msg
        })
    }

    const {email, password} = req.body()

    User.findOne({email}, (err, user) => {

    })
}