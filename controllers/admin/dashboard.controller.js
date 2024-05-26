
const Movie = require('../../models/movie.model')
const MovieCategory = require("../../models/movie-category.model")
const Account = require("../../models/account.model")
const account = require("../../models/account_user.model")

module.exports.index = async (req, res) => {

    const statistic = {
        categoryMovie : {
            total : 0,
            active : 0,
            inactive : 0
        },
        movie : {
            total : 0,
            active : 0,
            inactive : 0
        },
        account : {
            total : 0,
            active : 0,
            inactive : 0
        },
        user : {
            total : 0,
            active : 0,
            inactive : 0
        }
    }

    // Category

    statistic.categoryMovie.total = await MovieCategory.countDocuments({
        deleted : false
    })
    statistic.categoryMovie.active = await MovieCategory.countDocuments({
        deleted : false,
        status : "active"
    })
    statistic.categoryMovie.inactive = await MovieCategory.countDocuments({
        deleted : false,
        status : "inactive"
    })

    // Product

    statistic.movie.total = await Movie.countDocuments({
        deleted : false
    })
    statistic.movie.active = await Movie.countDocuments({
        deleted : false,
        status : "active"
    })
    statistic.movie.inactive = await Movie.countDocuments({
        deleted : false,
        status : "inactive"
    })

    // Account

    statistic.account.total = await Account.countDocuments({
        deleted : false
    })
    statistic.account.active = await Account.countDocuments({
        deleted : false,
        status : "active"
    })
    statistic.account.inactive = await Account.countDocuments({
        deleted : false,
        status : "inactive"
    })

    // User

    statistic.user.total = await account.countDocuments({
        deleted : false
    })
    statistic.user.active = await account.countDocuments({
        deleted : false,
        status : "active"
    })
    statistic.user.inactive = await account.countDocuments({
        deleted : false,
        status : "inactive"
    })


    res.render("admin/pages/home/index",{
        pageTitle : "Trang Quan Ly",
        statistic : statistic
    })
}