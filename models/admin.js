var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    nombreUsuario: String,
    contrasenia: String 
});

module.exports = mongoose.model('admin',esquema);