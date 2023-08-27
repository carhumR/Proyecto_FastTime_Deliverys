var express = require('express');
var router = express.Router();
var producto = require('../models/productos');
var mongoose = require('mongoose');

//Servicio para obtener usuarios
router.get('/',function(req,res){
    producto.find({},{_id:true,nombre:true})
    .then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});


//Obtener empresa de un producto
router.get('/:id/empresa',function(req,res){
    producto.aggregate([
        {
            $lookup:{
                from:"empresas",
                localField:"empresa",
                foreignField:"_id", //Es decir el atributo de la coleccion con la que se va a relacinar, en este caso, coleccion2,
                as:"empresa"
            }
        },
        {
            $match:{
                _id:mongoose.Types.ObjectId(req.params.id)
            }
        },
        {
            $project:{
                _id:true,
                nombre:true,
                imagen:true,
                "empresa._id":true,
                "empresa.nombre":true
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


//Crear Producto

router.post('/', (req, res) => {
    let u = new producto({
        nombre: req.body.nombre,
        empresa:mongoose.Types.ObjectId(req.body.empresa),
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
        precio: req.body.precio
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