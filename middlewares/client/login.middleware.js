const account = require('../../models/account_user.model')



module.exports.requireAuth = async (req,res,next) =>{
    const user = await account.findOne({ tokenUser : req.cookies.tokenUser}).select("-passWord")
    if(user){
        res.locals.user = user
    
    }
    next()
}