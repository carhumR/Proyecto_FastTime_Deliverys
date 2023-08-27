const { ObjectId } = require('mongoose');
var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    motorista : ObjectId,
    producto:  ObjectId,
    cantidad: String,
    estado: String,
    ubicacion: String
});

module.exports = mongoose.model('ordenes',esquema);