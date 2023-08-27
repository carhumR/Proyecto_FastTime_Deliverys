var mongoose = require('mongoose');

var esquema = new mongoose.Schema({
    nombre : String,
    apellido: String,
    email : String,
    password : String,
    fechaNacimiento : String,
    genero: String,
    ciudad: String,
    telefono: String,
    tarjetas: Array,
    orden: Array
});

module.exports = mongoose.model('clientes',esquema);