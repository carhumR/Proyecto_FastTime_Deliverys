var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    nombres : String,
    apellidos: String,
    email : String,
    password : String,
    fechaNacimiento : String,
    genero: String,
    ciudad: String,
    telefono: String,
    modeloMoto: String,
    placa: String,
    aprobado: String
});



module.exports = mongoose.model('motoristas',esquema);