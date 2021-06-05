const sequelize = require ('../../db/db.conexion')

module.exports = class ModeloPresupuesto {
    constructor(datos){
        this.datos = datos
    }

    static async createPresupuesto (presupuesto){
        let createPres = [
            presupuesto.fecha_presupuesto,
            presupuesto.proyecto_presupuesto,
            presupuesto.version_presupuesto
        ]
        let createResumen = [
            presupuesto.ventas,
            presupuesto.costos
        ]
        let createFlujo = [
            presupuesto.ingresos,
            presupuesto.egresos
        ]
        try {
            let resultado = await sequelize.query(`INSERT INTO presupuesto (fecha_presupuesto, proyecto_presupuesto, version_presupuesto) VALUES (?,?,?)`,
            {replacements : createPres, type: sequelize.QueryTypes.SELECT })
            let resul = await sequelize.query(`INSERT INTO resumenFinanciero (ventas, costos) values (?,?)`,
            {replacements : createResumen, type : sequelize.QueryTypes.SELECT})
            let response = await sequelize.query(`INSERT INTO flujoEfectivo (ingresos, egresos) values (?,?)`,
            {replacements : createFlujo, type : sequelize.QueryTypes.SELECT})
            
            return resultado, resul,response
        } catch (e) {
            console.log(e);
            throw new Error ('Error : ',e)
        }   
    }

    static async listPresupuesto (data){
       
        try {
            
            let resultado = await sequelize.query(`select id_presupuesto, fecha_presupuesto,proyecto_presupuesto, version_presupuesto, ventas, costos from presupuesto p join resumenFinanciero rF on p.id_resumen = rF.id_resumenF`)
            return resultado   
        } catch (e) {
            console.log(e);
        }
        
    }

    static async listflujo (data){
       
        try {
            
            let resultado = await sequelize.query(`select id_presupuesto, fecha_presupuesto,proyecto_presupuesto, version_presupuesto, ingresos, egresos from presupuesto p join flujoEfectivo fE on p.id_flujo = fE.id_flujoE`)
            return resultado   
        } catch (e) {
            console.log(e);
        }
        
    }
    static async listestado (data){
       
        try {
            
            let resultado = await sequelize.query(`select id_presupuesto, fecha_presupuesto,proyecto_presupuesto, version_presupuesto, ventas, costos from presupuesto p join resumenFinanciero rF on p.id_resumen = rF.id_resumenF`)
            return resultado   
        } catch (e) {
            console.log(e);
        }
        
    }

}