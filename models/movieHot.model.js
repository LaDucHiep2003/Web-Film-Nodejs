const { default: mongoose } = require("mongoose");
var slug = require('mongoose-slug-generator');

mongoose.plugin(slug);
const movieHotSchema = new mongoose.Schema(
    {
        name: { type: String, maxLength: 255 },
        nameOther: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        backgound: { type: String },
    },   
    {
        timestamps: true,
    },
)

const Product = mongoose.model('MovieHot', movieHotSchema, 'movie-hots')

module.exports = Product