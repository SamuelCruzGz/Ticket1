const sequelize = require ('../../db/db.conexion')

module.exports = class ModeloUsuario {
    constructor (datos) {
        this.datos = datos
    }

    static async checkUsers (user){
        let userCheck = [
            user.usuario,
            user.pass
        ]
        try {
            let resultado = await sequelize.query(`SELECT * FROM usuario where usuario = ? and pass = ?`,
            {replacements : userCheck, type : sequelize.QueryTypes.SELECT})
            if(resultado[0] === undefined){
                return false
            }else{
               return true
            }
        } catch (e) {
            console.log(e);
            throw new Error ('Error: ',e)
        }
    }
}