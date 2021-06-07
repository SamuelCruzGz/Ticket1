const { response } = require('express')
const sequelize = require ('../../db/db.conexion')
const { createUser } = require('../controlador/controlador.usuario')

module.exports = class ModeloUsuario {
    constructor (datos) {
        this.datos = datos
    }

    static async list(){
        let resultado = await sequelize.query ('SELECT  nombres, apellidos, usuario, id_usuario FROM usuario')
        return resultado
    }

    static async delUser (data){
        let dele =  [
            data
        ]
        try {
            let resultado = await sequelize.query(`DELETE FROM usuario where id_usuario=?`,{
                replacements : dele, type : sequelize.QueryTypes.SELECT
            })
        } catch (e) {
            
        }
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

    static async createUsuario (data){
        let createUsr = [
            data.nombres, 
            data.apellidos, 
            data.usuario, 
            data.pass,
            data.cpass
        ]
        try {
            let resultado = await sequelize.query('INSERT INTO usuario (nombres, apellidos, usuario, pass, cpass) values (?,?,?,?,?)',
            {replacements : createUsr, type : sequelize.QueryTypes.SELECT})
            return resultado
        } catch (e) {
            console.log(e);
        }
    }

}