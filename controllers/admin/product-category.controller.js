

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
// [POST] /admin/product-category/delete

module.exports.delete = async (req, res) => {
    const id = req.params.id

    await MovieCategory.updateOne({ _id: id }, { deleted : true})

    res.redirect(`/admin/products-category`)
}

// [Get] /admin/product-category/edit/:id

module.exports.edit = async (req, res) => {

    const movie = await MovieCategory.findOne({ 
        _id : req.params.id,
        deleted : false
    })

    res.render("admin/pages/products-category/edit",{
        pageTitle : "Chỉnh sửa danh mục phim",
        movie : movie
    })
}