
const Movie = require('../../models/movie.model')
const account = require('../../models/account_user.model')
const md5 = require('md5');
const MovieCategory = require("../../models/movie-category.model")
const movieHelper = require("../../helpers/movieCategoryHelper")

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
    const moviesHot = await Movie.find({
        deleted : false,
        status : "active",
        featured : "1"
    })

    res.render("client/pages/home/index",{
        pageTitle : "Trang chủ",
        movies : movies,
        moviesHot : moviesHot,
        pagination : objectPagination,
        keywork : keywork,
    })
}


module.exports.login = async (req, res) => {


    res.render("client/pages/home/login",{
        pageTitle : "Đăng nhập",
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

        res.redirect(`back`)
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
        req.flash("error","Tài khoản đã tồn tại")
        res.redirect("back")
        return
    }

    if(md5(passWord) != user.passWord){
        req.flash("error","Mật khẩu không chính xác")
        res.redirect("back")
        return
    }

    if(user.status == "inactive"){
        req.flash("error","Tài khoản đã bị khóa")
        res.redirect("back")
        return
    }

    res.cookie("tokenUser", user.tokenUser)
    res.redirect(`/`)
}

module.exports.logout = async (req, res) => {
    res.clearCookie("tokenUser")

    res.redirect(`/`)
}

module.exports.category = async (req, res) => {
    if(req.params.slugCategory == "favicon.ico"){
        return res.status(404).end();
    }

    const category = await MovieCategory.findOne({
        slug : req.params.slugCategory,
        status : "active",
        deleted : false
    })
    const lishSubCategory = await movieHelper.getSubCategory(category.id)
    console.log(category);
    const lishSubCategoryId = lishSubCategory.map(item => item.id)
    const movies = await Movie.find({
        movie_category_id : {$in : [category.id, ...lishSubCategoryId]},
        deleted : false
    }).sort({position : "desc"})

    const listCate = category.name
    res.render("client/pages/home/categoryMovie",{
        pageTitle : "Trang chủ",
        movieCategory : movies,
        listCate : listCate
    })

}