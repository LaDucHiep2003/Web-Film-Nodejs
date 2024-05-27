
const Movie = require('../../models/movie.model')
const account = require("../../models/account_user.model");
const Account = require('../../models/account_user.model');

module.exports.show = async (req, res) => {

    const slug = req.params.slug;
    const movie = await Movie.findOne({slug : slug})
    if(movie.comments){
        for (const comment of movie.comments) {
            const userId = comment.user_id
            const user = await account.findOne({_id : userId})
            if(user){
                comment.user = user
            }
        }
    }
    
    res.render("client/pages/show/index",{
        pageTitle : "Trang thông tin",
        movie : movie,
    })
}

module.exports.watch = async (req, res) => {

    const slug = req.params.slug;
    const movie = await Movie.findOne({slug})
    if(movie.comments){
        for (const comment of movie.comments) {
            const userId = comment.user_id
            const user = await account.findOne({_id : userId})
            if(user){
                comment.user = user
            }
        }
    }
    const { tap } = movie
    const x = req.params.newEp
    const foundEpisode = tap.filter((episode) => episode.e == x);
    movie.currentEpi = parseInt(x)
    res.render("client/pages/watch/index",{
        pageTitle : "Xem phim",
        movie : movie,
        foundEpisode : foundEpisode[0]
    })
}

module.exports.comments = async (req, res) => {
    const movieId = req.params.movieId
    const { comment } = req.body;

    if (!comment) {
        return res.status(400).json({ message: 'Comment is required' });
    }

    
    const record = {
        user_id : res.locals.user.id,
        comment : comment,
    }
    await Movie.updateOne({_id : movieId},{
        ...req.body,
        $push : {comments : record}
    })

    const comments = {
        comment : comment,
        user : res.locals.user
    }
    res.status(201).json(comments);
}

