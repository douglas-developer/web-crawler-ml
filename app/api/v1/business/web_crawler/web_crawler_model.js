const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const Model = new mongoose.Schema({
    name: {
        type: String,
    },
    link: {
        type: String,
    },
    price: {
        type: String,
    },
    store : {
        type: String
    },
    state : {
        type: String,
    },
    search : {
        type: String,
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
});

Model.index({link : "text", name : "text"})
Model.plugin(mongoosePaginate);

const Product = mongoose.model('Product', Model);
module.exports = Product;

