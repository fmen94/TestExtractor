const fetch = require("node-fetch")
const  moment = require('moment');
const conection= require("./helpers/conecDB.helper")
console.log("Inicialize Aut fb "+moment().format('YYYY-MM-DDTHH:mm:ss'));


conection('SELECT value FROM squint_admin.squint_config where name = "fb_page_ext_time"').then(e=>{
    const time= parseInt(e[0].value)   
    console.log("Start interval "+moment.duration(time,'milliseconds').asHours()+ " hours" );
    const interval = setInterval(()=>intervalFunction(time,interval),time)
})





let intervalFunction =async (time,interval)=>{
    console.log("Running every " +moment.duration(time,'milliseconds').asMinutes()+ " minutes");
    console.log(moment().format('YYYY-MM-DDTHH:mm:ss')+" Start proses");
    let newTime = await conection('SELECT value FROM squint_admin.squint_config where name = "fb_page_ext_time"')
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

