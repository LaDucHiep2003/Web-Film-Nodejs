
const Movie = require('../../models/movie.model')

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


    res.render("admin/pages/product/index", {
        pageTitle: "Trang Quan Ly",
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


    switch (type) {
        case "delete-all":
            await Movie.updateMany({_id : {$in : ids}},{deleted : true, deletedAt : new Date()} )
            req.flash('sucsess', `Xoa Thanh Cong ${ids.length} San Pham`);
            break;
        case "change-position":
            for(const item of ids){
                let [id,position] = item.split("-")
                position = parseInt(position)
                await Movie.updateOne({_id : id} ,{position : position})
            }
            req.flash('sucsess', `Cap Nhat Trang Thai Thanh Cong ${ids.length} San Pham`);
            
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
            deletedAt : new Date()
        })
    req.flash('sucsess', `Xoa Thanh Cong San Pham`);
    res.redirect("back")
}

// [GET] /admin/product/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/product/create", {
        pageTitle: "Trang Them Moi",
    })
}

// [POST] /admin/product/create
module.exports.createPost = async (req, res) => {

    if(req.body.position == ""){
        const countMovie = await Movie.countDocuments()
        req.body.position = countMovie + 1
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
        pageTitle: "Trang Chinh Sua",
        movie : movie
    })
}

module.exports.editPatch = async (req, res) => {

    req.body.position = parseInt(req.body.position)
    if(req.file){
        req.body.image = `/uploads/${req.file.filename}`
    }
    
    try {
        await Movie.updateOne({_id : req.params.id},req.body)
        req.flash('sucsess', 'Cap Nhat Thanh Cong');
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


    res.render("admin/pages/product/deleted", {
        pageTitle: "Da Xoa",
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
    req.flash('sucsess', `Xoa Khoi Phuc San Pham`);
    res.redirect("back")
}


