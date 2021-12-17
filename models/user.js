const mongoose = require('mongoose')

const userSchema = mongoose.userSchema({
    firstName: {
        type: String,
        trim: true,
        requires: true,
        maxLength: 32
    },
    lastName: {
        type: String,
        trim: true,
        requires: true,
        maxLength: 32
    },
    dob: {
        type: Date,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        maxlength: 13,
        trim: true,
    },
    whatsappPhoneNumber: {
        type: String,
        maxlength: 15,
        trim: true,
    },
    telegramPhoneNumber: {
        type: String,
        maxlength: 15,
        trim: true,
    },
    collegeName: {
        type: String,
        maxlength: 200,
        trim: true
    },
    regNo: {
        type: String,
        maxlength: 10,
        trim: true
    },
    instituteAddress: {
        type: String,
        maxlength: 200,
        trim: true
    },
    course: {
        //Name of course like B.E., B.Tech etc..
        type: String,
        maxlength: 100,
        trim: true
    },
    yearOfStudy: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },
    userId: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isProfileComplete: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', userSchema)