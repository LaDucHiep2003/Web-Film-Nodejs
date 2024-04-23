
const Movie = require('../../models/movie.model')
const MovieHot = require('../../models/movieHot.model')
const account = require('../../models/account_user.model')


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
    const formDate = req.body;
    res.json(req.body)
    // const acc = new account(formDate);
    // acc
    //     .save()
    //     .then(() => res.redirect('/login'))
    //     .catch(next);
}




