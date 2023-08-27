var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    nombre : String,
    categoria: String,
    logo: String,
    ubicacion: Array
});

module.exports = mongoose.model('empresas',esquema);