const { ObjectId } = require('mongoose');
var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    empresa : ObjectId,
    nombre: String,
    descripcion: String,
    imagen: String,
    precio: String
});

module.exports = mongoose.model('productos',esquema);