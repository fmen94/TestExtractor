const fetch = require("node-fetch")
const  moment = require('moment');
const typeorm = require("typeorm");
let con
 typeorm.createConnection( {
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
}).then(e=>{con=e
    console.log("DB conected");
    console.log("Inicialize Aut fb "+moment().format('YYYY-MM-DDTHH:mm:ss'));
con.query('SELECT value FROM squint_config where name = "fb_page_ext_time"').then(e=>{
    const time= parseInt(e[0].value)   
    console.log("Start interval "+moment.duration(time,'milliseconds').asHours()+ " hours" );
    const interval = setInterval(()=>intervalFunction(time,interval),time)
})


})






let intervalFunction =async (time,interval)=>{
    console.log("Running every " +moment.duration(time,'milliseconds').asMinutes()+ " minutes");
    console.log(moment().format('YYYY-MM-DDTHH:mm:ss')+" Start proses");
    let newTime = await con.query('SELECT value FROM squint_config where name = "fb_page_ext_time"')
    if(time!=newTime[0].value){
        console.log("Restart Interval to "+ newTime[0].value+" milisecons");
        clearInterval(interval)
         interval = setInterval(()=>intervalFunction(parseInt(newTime[0].value),interval),parseInt(newTime[0].value))
    }else{
   
    let url = 'http://localhost:3000/generate/aut?records=2'
    fetch(url)
        .then(res=> console.log(moment().format('YYYY-MM-DDTHH:mm:ss')+" End proses "))

    }
}

