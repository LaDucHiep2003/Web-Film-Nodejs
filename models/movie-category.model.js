const { default: mongoose } = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);
const movieCategorySchema = new mongoose.Schema(
    {
        name: { type: String, maxLength: 255 },
        image: { type: String },
        slug: { type: String, slug: 'name'},
        position : {type : Number},
        deleted : {
            type : Boolean,
            default : false
        },
        status : {type : String},
        deletedAt : {type : Date},
        parent_id : {
            type : String,
            default : ""
        },
    },
    {
        timestamps: true,
    },
)

const MovieCategory = mongoose.model('MovieCategory', movieCategorySchema, 'movie_categorys')

module.exports = MovieCategory