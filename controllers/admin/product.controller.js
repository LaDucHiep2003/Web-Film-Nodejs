
const Movie = require('../../models/movie.model')
const MovieCategory = require("../../models/movie-category.model")
const createTree = require("../../helpers/createTree")
const Account = require("../../models/account.model")


module.exports.index = async (req, res) => {

    const filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ]
    const find = {
        deleted: false
    }

    if (req.query.status) {
        const index = filterStatus.findIndex(item => item.status == req.query.status)
        filterStatus[index].class = "active"
    } else {
        const index = filterStatus.findIndex(item => item.status == "")
        filterStatus[index].class = "active"
    }

    if (req.query.status) {
        find.status = req.query.status
    }

    let keywork = ""
    if (req.query.keywork) {
        keywork = req.query.keywork
        const regex = new RegExp(keywork, "i")
        find.name = regex
    }

    // Pagination
    let objectPagination = {
        currentPage: 1,
        limitItem: 5
    }

    if (req.query.page) {
        objectPagination.currentPage = parseInt(req.query.page)
    }

    // Sort
    let sort = {

    }
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue
    }
    else{
        sort.position = "desc"
    }

    // End Sort
    const countMovie = await Movie.countDocuments(find)

    const totalPage = Math.ceil(countMovie / objectPagination.limitItem)
    objectPagination.totalPage = totalPage

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem
    // End paginatinon


    const movies = await Movie.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip).sort(sort)

    for (const movie of movies) {
        // Lay thong tin nguoi tao

        const user = await Account.findOne({
            _id : movie.createdBy.account_id
        })

        if(user){
            movie.accountFullname = user.fullName
        }
        // Lay thong tin nguoi cap nhat gan nhat
        const updatedBy = movie.updatedBy.slice(-1)[0];
        if(updatedBy){
            const userUpdated = await Account.findOne({
                _id : updatedBy.account_id
            })

            updatedBy.accountFullname = userUpdated.fullName
        }
        
    }


    res.render("admin/pages/product/index", {
        pageTitle: "Trang quản lý",
        movies: movies,
        filterStatus: filterStatus,
        keywork: keywork,
        pagination: objectPagination
    })
}

// [PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type
    const ids = req.body.ids.split(", ")

    const updatedBy = {
        account_id : res.locals.user.id,
        updatedAt : new Date()
    }

    switch (type) {
        case "delete-all":
            await Movie.updateMany({_id : {$in : ids}},{deleted : true, deletedAt : new Date()} )
            req.flash('sucsess', `Xóa thành công ${ids.length} bộ phim`);
            break;
        case "change-position":
            for(const item of ids){
                let [id,position] = item.split("-")
                position = parseInt(position)
                await Movie.updateOne({_id : id} ,{
                    position : position,
                    $push: { updatedBy : updatedBy}
                })
            }
            req.flash('sucsess', `Cập nhật trạng thái thành công ${ids.length} bộ phim`);
            
            break;
        default:
            break;
    }
    res.redirect("back")
}
// [PATHCH] /admin/product/detele/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id

    await Movie.updateOne({ _id: id },
        {
            deleted : true,
            deletedBy: {
                account_id : res.locals.user.id,
                deletedAt : new Date()
            } 
        })
    req.flash('sucsess', `Xóa thành công bộ phim`);
    res.redirect("back")
}

// [GET] /admin/product/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }

    const category = await MovieCategory.find(find)
    const newCategory = createTree.tree(category)

    res.render("admin/pages/product/create", {
        pageTitle: "Trang thêm mới phim",
        category : newCategory
    })     
}

// [POST] /admin/product/create
module.exports.createPost = async (req, res) => {

    if(req.body.position == ""){
        const countMovie = await Movie.countDocuments()
        req.body.position = countMovie + 1
    }

    req.body.createdBy = {
        account_id : res.locals.user.id
    }

    const movie = new Movie(req.body)
    await movie.save()

    res.redirect(`/admin/products`)
}

module.exports.edit = async (req, res) => {

    const find = {
        deleted : false,
        _id : req.params.id
    }
    const movie = await Movie.findOne(find)
    res.render("admin/pages/product/edit", {
        pageTitle: "Trang chỉnh sửa",
        movie : movie
    })
}


module.exports.editPatch = async (req, res) => {

    req.body.position = parseInt(req.body.position)
    const updatedBy = {
        account_id : res.locals.user.id,
        updatedAt : new Date()
    }
    
    try {
        await Movie.updateOne({_id : req.params.id},{
            ...req.body,
            $push: { updatedBy : updatedBy}
        })
        req.flash('sucsess', 'Cập nhật thành công thông tin');
    } catch (error) {
        
    }
   

    res.redirect(`back`)
}

module.exports.deleted = async (req, res) => {
    const filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ]
    const find = {
        deleted: true
    }

    if (req.query.status) {
        const index = filterStatus.findIndex(item => item.status == req.query.status)
        filterStatus[index].class = "active"
    } else {
        const index = filterStatus.findIndex(item => item.status == "")
        filterStatus[index].class = "active"
    }

    if (req.query.status) {
        find.status = req.query.status
    }

    let keywork = ""
    if (req.query.keywork) {
        keywork = req.query.keywork
        const regex = new RegExp(keywork, "i")
        find.name = regex
    }

    // Pagination
    let objectPagination = {
        currentPage: 1,
        limitItem: 3
    }

    if (req.query.page) {
        objectPagination.currentPage = parseInt(req.query.page)
    }

    // Sort
    let sort = {

    }
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue
    }
    else{
        sort.position = "desc"
    }

    // End Sort
    const countMovie = await Movie.countDocuments({deleted : false})

    const totalPage = Math.ceil(countMovie / objectPagination.limitItem)
    objectPagination.totalPage = totalPage

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem
    // End paginatinon


    const movies = await Movie.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip).sort(sort)

    for (const movie of movies) {
        // lay thong tin nguoi tao

        const user = await Account.findOne({
            _id : movie.deletedBy.account_id
        })

        if(user){
            movie.accountFullname = user.fullName
        }
    }


    res.render("admin/pages/product/deleted", {
        pageTitle: "Phim đã xóa",
        movies: movies,
        filterStatus: filterStatus,
        keywork: keywork,
        pagination: objectPagination
    })
}

module.exports.stored = async (req, res) => {

    const id = req.params.id

    await Movie.updateOne({ _id: id },
        {
            deleted : false,
            deletedAt : new Date()
        })
    req.flash('sucsess', `Khôi phục thành công phim`);
    res.redirect("back")
}

module.exports.newEpisode = async (req, res) => {

    const movie = await Movie.findOne({_id : req.params.id})

    res.render("admin/pages/product/newEpisode", {
        pageTitle: "Thêm tập phim mới",
        movie : movie
    })
   
}

module.exports.newEpisodePatch = async (req, res) => {

    const newEp = {
        e : req.body.e,
        v : req.body.v
    }

    await Movie.updateOne({_id : req.params.id},{
        ...req.body,
        $push: { tap : newEp}
    })
    res.redirect("back")
   
}

// [PATHCH] /admin/product/permanently/:id
module.exports.deleteItemPermanently = async (req, res) => {
    const id = req.params.id

    await Movie.deleteOne({ _id: id })
    req.flash('sucsess', `Xoá thànhb công sản phẩm`);
    res.redirect("back")
}

