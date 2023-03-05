const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  imageUrl: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
}
}, {
  timestamps: true
});

const Product = mongoose.model("Product", ProductSchema);



module.exports =   Product ;
