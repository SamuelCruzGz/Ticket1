const cont = require ('../controlador/controlador.usuario')

module.exports = async (app) => {
    app.get('/', cont.checkUser, async (req, res)=>{
        res.json('ok')
    })

    app.get('/mainPage',async(req, res)=>{
        try {
            res.render("mainPage")
        } catch (e) {
            console.log(e);
            res.status(400).json('No se pudo acceder a la página')
        }
    })

    app.get('/login', async (req, res) => {
        try {
            res.render("login")
        } catch (e) {
            console.log(e)
            res.status(400).json('No se pudo abrir la pagina')
        }
    })


    app.post('/login', async (req, res)=>{
        let user = req.body
        try {
            let resultado = await cont.existedUser(user)
            
            if(resultado){
                let tokenResponse = cont.generateToken(user)
                res.redirect('/mainPage')
            }else{
                
                throw new Error ('Error al generar token')
                
            }
        } catch (e) {
            console.log(e);
            res.status(400)
        }
    })
}