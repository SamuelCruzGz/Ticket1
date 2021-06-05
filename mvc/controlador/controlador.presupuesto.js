const presupuesto = require('../modelo/modelo.presupuesto')

module.exports = class ControladorPresupuesto {
    constructor(datos){
        this.datos = datos
    }

    static async createPres (data){
        try {
            await presupuesto.createPresupuesto(data)
            return 'Alta correcta'
        } catch (e) {
            console.log(e);
            throw new Error ('Error al agregar')
        }
    }

    static async listPresu  (){
        try {
            let resultado = await presupuesto.listPresupuesto()
            return resultado
        } catch (e) {
            console.log(e);
        }
    }

    static async flujoE  (){
        try {
            let resultado = await presupuesto.listflujo()
            return resultado
        } catch (e) {
            console.log(e);
        }
    }
    
    static async estadoR  (){
        try {
            let resultado = await presupuesto.listestado()
            return resultado
        } catch (e) {
            console.log(e);
        }
    }
}