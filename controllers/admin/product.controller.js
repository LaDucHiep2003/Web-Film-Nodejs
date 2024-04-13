
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
    const countMovie = await Movie.countDocuments({deleted : false})

    const totalPage = Math.ceil(countMovie / objectPagination.limitItem)
    objectPagination.totalPage = totalPage

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem
    // End paginatinon


    const movies = await Movie.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip).sort({position : "desc"})


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

    req.body.image = `/uploads/${req.file.filename}`
    const movie = new Movie(req.body)
    await movie.save()

    res.redirect(`/admin/products`)
    console.log(req.file);
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


