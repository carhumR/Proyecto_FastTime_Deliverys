var express = require("express");
var database = require("./modules/database");
var bodyParser = require("body-parser");
var usuariosRouter = require("./routers/usuarios-router");
var clientesRouter = require("./routers/clientes-router");
var motoristasRouter = require("./routers/motoristas-router");
var adminRouter = require("./routers/admin-router");
var empresasRouter = require("./routers/empresas-router");
var productosRouter = require("./routers/productos-router");
var ordenesRouter = require("./routers/ordenes-router");


var app = express();

//Midleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public/client"));
app.use('/administrative', express.static("public/administrative"));
app.use('/motorista', express.static("public/motorista"));
app.use('/usuarios',usuariosRouter);
app.use('/motoristas',motoristasRouter);
app.use('/admin',adminRouter);
app.use('/empresas',empresasRouter);
app.use('/productos',productosRouter);
app.use('/clientes',clientesRouter);
app.use('/ordenes', ordenesRouter)




app.listen(5050, function(){
    console.log("Servidor en linea");
});