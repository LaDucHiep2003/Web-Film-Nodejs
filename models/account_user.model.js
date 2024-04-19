const { default: mongoose } = require("mongoose");

const loginSchema = new mongoose.Schema(
    {
        userName : {type : String},
        passWord : {type : String},
        success : {
            type : Boolean,
            default : true
        },
        avata : {
            type : String,
            default : "https://res.cloudinary.com/dsxkwbfyq/image/upload/v1710926474/avatar-facebook-mac-dinh-14_a4dhcr.jpg"
        },
        maxim : {type : String},
        dateTime : {type :Date},
        accountName : {type : String},
        email : {type : String},
    },   
    {
        timestamps: true,
    },
)

const Product = mongoose.model('account', loginSchema, 'account_users')

module.exports = Product