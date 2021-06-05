const cont = require('../controlador/controlador.presupuesto')

module.exports = async(app) =>{
    app.get('/listarPresupuesto', async (req, res) => {
        try {
            res.render("presupuesto")
        } catch (e) {
            console.log(e)
            res.status(400).json('No se pudo abrir la pagina')
        }
    })

    app.post('/nuevoPresupuesto', async (req, res)=>{
        let presupuesto = req.body
        try {
            let resultado = await cont.createPres(presupuesto)
            res.redirect('/listarPresupuesto')
        } catch (e) {
            console.log(e);
        }
    })

    app.get('/consulta', async (req, res)  =>{
        try {
            let resultado = await cont.listPresu()
            res.render("consultar", {
                data : resultado[0]
            })
        } catch (e) {
            console.log(e);
        }
    })

    app.get('/flujoE', async (req, res)  =>{
        try {
            let resultado = await cont.flujoE()
            res.render("flujoEfectivo", {
                data : resultado[0]
            })
        } catch (e) {
            console.log(e);
        }
    })

    app.get('/estadoR', async (req, res)  =>{
        try {
            let resultado = await cont.estadoR()
            res.render("estadosResultados", {
                data : resultado[0]
            })
        } catch (e) {
            console.log(e);
        }
    })
 }