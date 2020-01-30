const fetch = require("node-fetch")

console.log("Inicialize Aut fb "+Date());




setInterval(async e=>{
    console.log(Date()+" Start proses" );
    let url = 'http://localhost:3000/generate/aut?records=1'
    fetch(url)
        .then(res=> console.log(Date()+" End proses "))
},10*60*1000)