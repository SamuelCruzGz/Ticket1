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
        let user = res.body
        try {
            
            res.render("login",{
                data : user
            })
        } catch (e) {
            console.log(e)
            res.status(400).json('No se pudo abrir la pagina')
        }
    })

    
    app.get('/profile', async (req, res) => {   
        try {
            let resultado = await cont.profileuser()
            res.render("profile",{
                data : resultado[0]
            })
        } catch (e) {
            console.log(e)
            res.status(400).json('No se pudo abrir la pagina')
        }
    })


    app.get('/register', async (req, res) => {
     
        try {
            
            res.render("register")
        } catch (e) {
            console.log(e)
            res.status(400).json('No se pudo abrir la pagina')
        }
    })

    app.post('/register', async (req, res)=>{
        let user = req.body
        try {      
                let resultado = await cont.createUser(user)
                 
                 res.redirect('/register')
                
            
        } catch (e) {
            console.log(e);
            res.status(400)
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

    app.get('/profile', async (req, res)=>{    
        try {
            let resultado = await cont.profileuser()
            res.render ('profile', {
                data : resultado[0]
            })
        } catch (e) {
            
        }


    })

    app.get('/bajaUsuario/:id_usuario',async (req, res)=>{
        const del = req.params.id_usuario
        try {
            await cont.deleUSer(del)
            res.redirect('/login')
        } catch (e) {
            console.log(e);
        }
    })
}