// import mongoose library
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
// initialize the class hotel
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const User = mongoose.Schema(
    {
        IdentityCard: {
            type: Number,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        nickName: {
            type: String,
        },
        accountNumber: {
            type: Number,
            unique: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: false,
        },
    },
    //for showing time create and update
    { timestamps: true }
);

module.exports = mongoose.model('User', User);
