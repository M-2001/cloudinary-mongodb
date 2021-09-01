const { model, Schema } = require("mongoose");

const Foto =  new Schema({
    title : String,
    description: String,
    imageURL: String,
    public_id: String
})
module.exports = model('Foto', Foto);