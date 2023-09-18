const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');

const Product = new Schema(
    {
        proName: { type: String, required: true },
        proPrice: { type: Number, required: true },
        proImage: { type: String, required: true },
        proCategory: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
Product.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
module.exports = mongoose.model('Product', Product);