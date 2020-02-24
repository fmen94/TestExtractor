const typeorm = require("typeorm");
module.exports= creatConexions=async(query,parametres)=>{
    let response
    await typeorm.createConnection( {
        type: "mysql",
        host: "ls-5e531f586183bdb9627025a05b5b3b7f206245aa.cnz9raiumfbl.us-east-1.rds.amazonaws.com",
        port: 3306,
        username : "prd_squint_reader",
        password : "prd_ApiSquint.19",
        database : "squint_admin",
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
