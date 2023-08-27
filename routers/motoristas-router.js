var express = require('express');
var router = express.Router();
var motorista = require('../models/motoristas');
var mongoose = require('mongoose');

//Servicio para obtener usuarios
router.get('/',function(req,res){
    motorista.find({},{_id:true,nombre:true})
    .then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//Crear Motorista
router.post('/', (req, res) => {
    let u = new motorista({
        nombres: req.body.nombres,
        ciudad:req.body.ciudad,
        email: req.body.email,
        fechaNacimiento: req.body.fechaNacimiento,
        genero: req.body.genero,
        password: req.body.password,
        telefono: req.body.telefono,
        apellidos: req.body.apellidos,
        modeloMoto: req.body.modeloMoto,
        placa: req.body.placa,
        aprobado: "0"
      
    });

    u.save().then(result => {
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(result);
        res.end();
    });    
});

 

module.exports = router;