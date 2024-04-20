const { default: mongoose } = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);
const movieSchema = new mongoose.Schema(
    {
        name: { type: String, maxLength: 255 },
        movie_category_id : {
            type : String,
            default : ""
        },
        image: { type: String },
        nameOther: { type: String },
        listCate: { type: String },
        newEp: { type: Number },
        infoMore: { type: Number },
        rate: { type: String },
        textContent: { type: String },
        videoId: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        backgound: { type: String },
        Showtimes : {type : Number},
        position : {type : Number},
        deleted : {
            type : Boolean,
            default : false
        },
        createdBy : {
            account_id : String,
            createdAt :{
                type : Date,
                default : Date.now
            }
        },
        status : {type : String},
        deletedBy : {
            account_id : String,
            deletedAt: Date
        },
        updatedBy : [
            {
                account_id : String,
                updatedAt: Date,
                
            }
        ],
        tap : [
            {
            e: {type : Number},
            v : {type : String},
            }
        ],
    },
    {
        timestamps: true,
    },
)

const Product = mongoose.model('Movie', movieSchema, 'movies')

module.exports = Product