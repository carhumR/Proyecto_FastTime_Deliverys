var express = require('express');
var router = express.Router();
var orden = require('../models/ordenes');
var mongoose = require('mongoose');

//Servicio para obtener ordenes
router.get('/',function(req,res){
    orden.find({estado:'sin tomar'},{})
    .then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//Servicio para obtener motorista
router.get('/:id/moto',function(req,res){
    orden.aggregate([
        {//Hacer cruce
            $lookup:{
                from:"motoristas",
                localField:"motorista",
                foreignField:"_id", //Es decir el atributo de la coleccion con la que se va a relacinar, en este caso, coleccion2,
                as:"motorista"
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
                "motorista._id":true,
                "motorista.nombres":true,


                
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

//Servicio para obtener producto
router.get('/:id/product',function(req,res){
    orden.aggregate([
        {//Hacer cruce
            $lookup:{
                from:"productos",
                localField:"producto",
                foreignField:"_id", //Es decir el atributo de la coleccion con la que se va a relacinar, en este caso, coleccion2,
                as:"producto"
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
                "producto._id":true,
                "producto.nombre":true,
                "producto.empresa":true,
                "producto.descripcion":true,
                "producto.precio":true,

                
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
//Servicio para tomar Orden
router.put('/:id/:idMotorista',(req,res) => {
    orden.update(
        {
            _id:mongoose.Types.ObjectId(req.params.id)
        },
        {
            motorista: mongoose.Types.ObjectId(req.params.idMotorista),
            estado: 'tomado'
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
    
   
});



module.exports = router;