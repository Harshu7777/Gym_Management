const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    mobileNo:{
        type:String
    },
    address:{
        type:String
    },
    membership:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'membership'
    },
    gym:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    profilePic:{
        type:String,
        default: ""
    },
    status:{
        type: String,
        default:"Active"
    },
    lastPayment:{
        type:Date,
        default:new Date()
    },
    nextBillDate:{
        type:Date,
        required:true
    }
} , {
    timestamps: true
})

module.exports = mongoose.model('member', memberSchema);