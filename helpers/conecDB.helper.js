const typeorm = require("typeorm");
module.exports= creatConexions=async(query,parametres)=>{
    let response
    await typeorm.createConnection( {
        type: "mysql",
        host: "ls-12d36fc3bdd65f2a11cdf23910a33767e186e18b.cnz9raiumfbl.us-east-1.rds.amazonaws.com",
        port: 3306,
        username : "squint_user_exractor01",
        password : "$Fer.Mendez@squint#",
        database : "squintadmin",
         synchronize : false,
         logging : false,
         entities : [],
         cli : {
            "entitiesDir": "app/models"
        },
         autoSchemaSync : true
      }).then(async e=>{
          await e.query(query,parametres).then(res=>{
             
              response= res
          })
          await e.close().then(e=>{
            
          })
           
        })
        .catch(e=>console.log(e))
    return response
}
