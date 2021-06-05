//Importacion de modulos
var express = require ('express')
var app = express()
require('dotenv').config()
const userView = require('./mvc/vista/vista.login')
const budgetView = require ('./mvc/vista/vista.presupuesto')
const sequelize = require('./db/db.conexion')
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//settings
app.use(express.static(__dirname + '/public'))
app.set('view engine','ejs')
app.set('views',__dirname+'/views')

async function inicioServer(){
    try {
        await sequelize.authenticate()
        app.listen(process.env.PORT, function(){
            console.log(`Sistema iniciado en http://${process.env.HOST}:${process.env.PORT}`);
        })
    } catch (e) {
        console.log("Conexion fallida", e);
    }
}

app.use((err, req, res, next)=>{
    if (err){
        console.log(err);
        if(!res.headerSent){
            res.render('404',{result:err.message})
                res.status(500).send("Error en el servidor: " +err.message)
        }
    }
    next()
})


inicioServer()
userView(app)
budgetView(app)