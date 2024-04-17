
const Role = require("../../models/role.model")



// [GET] /admin/role
module.exports.index = async (req, res) => {

    let find = {
        deleted : false
    }

    const records = await Role.find(find)
    res.render("admin/pages/roles/index",{
        pageTitle : "Trang Nhom quyen",
        records : records
    })
}

// [GET] /admin/role/create
module.exports.create = async (req, res) => {

    
    res.render("admin/pages/roles/create",{
        pageTitle : "Trang Tao Nhom Quyen",
    })
}

// [POST] /admin/role/create
module.exports.createPost = async (req, res) => {

    const record = new Role(req.body)
    await record.save()


    res.redirect(`/admin/roles`)
}


// [GET] /admin/role/edit
module.exports.edit = async (req, res) => {
    try{
        const id = req.params.id

        let find = {
            _id : id,
            deleted : false
        }

        const data = await Role.findOne(find)

        res.render("admin/pages/roles/edit",{
            pageTitle : "Trang Chinh Sua Nhom quyen",
            data : data
        })
    }catch(error){
        res.redirect(`/admin/roles`)
    }
    
}

// [POST] /admin/role/edit/:id
module.exports.editPatch = async (req, res) => {
    try{
        const id = req.params.id


        await Role.updateOne({_id : id},req.body)
        req.flash("sucsess","Cap Nhat Thanh Cong")

        
    }catch(error){
        req.flash("error","Cap Nhat Khong Thanh Cong")
    }
    res.redirect(`back`)
}
