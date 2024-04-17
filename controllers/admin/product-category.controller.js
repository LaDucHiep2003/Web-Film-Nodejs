

const MovieCategory = require("../../models/movie-category.model")
const createTree = require("../../helpers/createTree")

module.exports.index = async (req, res) => {
    
    const find = {
        deleted : false
    }

    const records = await MovieCategory.find(find)
    const newRecords = createTree.tree(records)

    res.render("admin/pages/products-category/index",{
        pageTitle : "Trang Danh Muc Phim",
        records : newRecords
    })
}

module.exports.create = async (req, res) => {
    const find = {
        deleted: false
    }


   
    const records = await MovieCategory.find(find)
    const newRecords = createTree.tree(records)

    console.log(newRecords);

    res.render("admin/pages/products-category/create",{
        pageTitle : "Tao Danh Muc Phim",
        records: newRecords
    })
}

// [POST] /admin/product-category/create

module.exports.createPost = async (req, res) => {


    if (req.body.position == "") {
        const countMovies = await MovieCategory.countDocuments()
        req.body.position = countMovies + 1
    }

    const record = new MovieCategory(req.body)

    await record.save()

    res.redirect(`/admin/products-category`)
}