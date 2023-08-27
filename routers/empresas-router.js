var express = require('express');
var router = express.Router();
var empresa = require('../models/empresas');
var mongoose = require('mongoose');

//Servicio para obtener usuarios
router.get('/',function(req,res){
 empresa.find({},{_id:true,nombre:true})
    .then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//Crear Producto

router.post('/', (req, res) => {
    let u = new empresa({
        nombre: req.body.nombre,
        ubicacion:req.body.ubicacion,
        categoria: req.body.categoria,
        logo: req.body.logo,
      
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