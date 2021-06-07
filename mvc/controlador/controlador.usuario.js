const login = require ('../modelo/modelo.login')
const jwt = require ('jsonwebtoken')



module.exports = class ControladorUsuarios {
    constructor (datos){
        this.datos = datos
    }


    static async profileuser  (){
        try {
            let resultado = await login.list()
            return resultado
        } catch (e) {
            console.log(e);
        }
    }

    static async deleUSer(data){
        try {
            let resultado = await login.delUser(data)
            return 'Baja Correcta'
        } catch (e) {
            console.log(e);
        }
    }

    static async checkUser(req, res, next){
        try {
            let token = req.headers['authorization']
            if (token != undefined){
                let tokenCheck  = token.split(' ')[1]
                let resultado = jwt.verify(tokenCheck, process.env.SECRET_KEY)
                if (resultado){
                    return next ()
                }else{
                    throw new Error('Tu token no es válido')
                }
            }else{
                res.status(400).json('Requieres de un token para ingresar')
            }    
        } catch (e) {
            console.log(e);
            throw new Error ('Error:',e)
        }
        
    }

    static async existedUser (data){
        let existUser = data
        try {
            let resultado = await login.checkUsers(existUser)
            console.log(resultado);
            if (resultado){
                return resultado
            }else{
                throw new Error('No existe el usuario')
            }
        } catch (e) {
            console.log(e);
            throw new Error ('Error : ',e)
        }
    }

    static async generateToken (data){
        try {
            let resultado = jwt.sign({
                data}, process.env.SECRET_KEY
            )
            return resultado 
        } catch (e) {
            console.log(e);
            throw new Error(e)
        }
    }

    static async createUser (data){
        try {
            await login.createUsuario(data)
            return 'Alta correcta'
        } catch (e) {
            console.log(e);
        }
    }

  
}