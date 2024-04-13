
const Movie = require('../../models/movie.model')

module.exports.show = async (req, res) => {

    const slug = req.params.slug;
    const movie = await Movie.findOne({slug})

    res.render("client/pages/show/index",{
        pageTitle : "Trang Thong Tin",
        movie : movie,
    })
}

module.exports.watch = async (req, res) => {

    const slug = req.params.slug;
    const movie = await Movie.findOne({slug})
    const { tap } = movie
    const x = req.params.newEp
    const foundEpisode = tap.filter((episode) => episode.e == x);
    res.render("client/pages/watch/index",{
        pageTitle : "Trang Xem Phim",
        movie : movie,
        foundEpisode : foundEpisode[0]
    })
}

