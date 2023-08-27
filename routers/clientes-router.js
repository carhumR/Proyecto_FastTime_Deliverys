var express = require('express');
var router = express.Router();
var cliente = require('../models/clientes');
var mongoose = require('mongoose');

//Servicio para obtener usuarios
router.get('/',function(req,res){
    cliente.find({},{_id:true,nombre:true})
    .then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//Crear Cliente
router.post('/', (req, res) => {
    let u = new cliente({
        nombre: req.body.nombre,
        ciudad:req.body.ciudad,
        email: req.body.email,
        fechaNacimiento: req.body.fechaNacimiento,
        genero: req.body.genero,
        password: req.body.password,
        telefono: req.body.telefono,
        apellido: req.body.apellido,
        tarjetas: []
      
    });

    u.save().then(result => {
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(result);
        res.end();
    });    
});


//Servicio para obtener orden
router.get('/:id/orden',function(req,res){
    cliente.aggregate([
        {//Hacer cruce
            $lookup:{
                from:"ordenes",
                localField:"orden",
                foreignField:"_id", //Es decir el atributo de la coleccion con la que se va a relacinar, en este caso, coleccion2,
                as:"orden"
            }
        },
        {//Aplicar Filtro
            $match:{
                _id:mongoose.Types.ObjectId(req.params.id)
            }
        },
        {//Que cambios son los que quiero en mi reultado
            $project:{
                _id:true,
                nombre:true,
                "orden._id":true,
                "orden.producto":true,
                "orden.motorista":true,
                
            }
        }
    ])
    .then((data)=>{
        res.send(data[0]);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});




module.exports = router;