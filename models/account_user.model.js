const { default: mongoose } = require("mongoose");
const generate = require("../helpers/generate")


const AccountSchema = new mongoose.Schema(
    {
        userName : {type : String},
        passWord : {type : String},
        tokenUser : {
            type : String,
            default : generate.generateRandomString(20)
        },
        status : {
            type : String,
            default : "active"
        },
        avata : {
            type : String,
            default : "https://res.cloudinary.com/dsxkwbfyq/image/upload/v1710926474/avatar-facebook-mac-dinh-14_a4dhcr.jpg"
        },
        maxim : {type : String},
        dateTime : {type :Date},
        accountName : {type : String},
        email : {type : String},
        deleted : {
            type : Boolean,
            default : false
        },
    },   
    {
        timestamps: true,
    },
)

const Account = mongoose.model('account', AccountSchema, 'account_users')

module.exports = Account