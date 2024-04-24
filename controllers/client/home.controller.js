
const Movie = require('../../models/movie.model')
const MovieHot = require('../../models/movieHot.model')
const account = require('../../models/account_user.model')
const md5 = require('md5');


module.exports.index = async (req, res) => {


    const find = {
        deleted : false
    }

    let keywork = ""
    if(req.query.keywork){
        keywork = req.query.keywork
        const regex = new RegExp(keywork,"i")
        find.name = regex
    }

    let objectPagination = {
        currentPage : 1,
        limitItem : 10
    }

    if(req.query.page){
        objectPagination.currentPage = parseInt(req.query.page)
    }
    const countMovie = await Movie.countDocuments(find)

    const totalPage = Math.ceil(countMovie / objectPagination.limitItem)
    objectPagination.totalPage = totalPage

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem

    const movies = await Movie.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip).sort({position : "desc"})
    const moviesHot = await MovieHot.find({})

    res.render("client/pages/home/index",{
        pageTitle : "Trang chu",
        movies : movies,
        moviesHot : moviesHot,
        pagination : objectPagination,
        keywork : keywork,
    })
}


module.exports.login = async (req, res) => {


    res.render("client/pages/home/login",{
        pageTitle : "Trang Dang Nhap",
    })
}

module.exports.stored = async (req, res,next) => {
    
    const userNameExits = await account.findOne({
        userName : req.body.userName,
        deleted : false
    })

    if(userNameExits){
        // req.flash("error","tai khoan da ton tai")
        res.redirect("back")
    }
    else{
        req.body.passWord = md5(req.body.passWord)
   
        const record = new account(req.body)
        await record.save()

        res.redirect(`/`)
    }
}

module.exports.success = async (req, res,next) => {
    const userName = req.body.userName
    const passWord = req.body.passWord
    
    const user = await account.findOne({
        userName : userName,
        deleted : false
    })

    if(!user){
        req.flash("error","tai khoan khong ton tai")
        res.redirect("back")
        return
    }

    if(md5(passWord) != user.passWord){
        req.flash("error","Mat khau khong chinh xac")
        res.redirect("back")
        return
    }

    if(user.status == "inactive"){
        req.flash("error","Tai khoan da bi khoa")
        res.redirect("back")
        return
    }

    res.cookie("token", user.token)
    res.redirect(`/`)
 
    
}




