var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Regex = require('../utils/regex');

var userSchema = new Schema({
    fullName: {
        type: String,
        trim: true,
        default : ''
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: [4, 'First name should be minimum 4 characters'],
        maxlength: [255, 'First name should be maximum 15 characters'],
        match: [Regex.FIRST_NAME_PATTERN, 'First name should contain only alphabets without spaces']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [2, 'First name should be minimum 2 characters'],
        maxlength: [255, 'Last name should be maximum 10 characters'],
        match: [Regex.LAST_NAME_PATTERN, 'Last name should contain only alphabets without spaces']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        minlength: [6],
        maxlength: [1024]
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [Regex.EMAIL_PATTERN, 'Email is not valid']
    },
    gender: {
        type: String,
        trim: true,
        default : ''
    },
    addresses : [
        {
            addressType: {
                type: String,
                trim: true,
                default : ''
            },
            street: {
                type: String,
                trim: true,
                default : ''
            },
            country: {
                type: String,
                trim: true,
                default : ''
            },
            state: {
                type: String,
                trim: true,
                default : ''
            },
            city: {
                type: String,
                trim: true,
                default : ''
            },
            pincode: {
                type: String,
                trim: true,
                default : ''
            }
        }
    ],
    dob: {
        type: Date,
        default : null
    },
    lastLoggedIn: {
        type: Date,
        default : null
    }
},{
    timestamps: true
});

// run pre save method
userSchema.pre('save', function (next) {
    this.fullName = this.firstName + ' ' + this.lastName;
    next();
});


// make this available to our users in our Node applications
module.exports = mongoose.model('User', userSchema);;
