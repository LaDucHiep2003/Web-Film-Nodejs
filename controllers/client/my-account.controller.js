
module.exports.index = async (req, res) => {

    res.render("client/pages/my-account/index",{
        pageTitle : "Thông tin cá nhân",
    })
}