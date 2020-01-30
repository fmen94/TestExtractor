const getTokens = require("../helpers/getTokens.heper")
const allSettled = require('promise.allsettled');
const conection= require("../helpers/conecDB.helper")
const callGraph = require("../helpers/callGraph.helper")

allSettled.shim();
module.exports = generateAut=async(records)=>{
    let calls
    await conection(query).then(e=>{
        calls=e.map(e=>{
            return callGraph(e.page_id,e.page_token,e.user_token,true,true,records)
        })
    })
    let response
    await Promise.allSettled(calls)
    .then(e=>{
        response = e
    })
    .catch(e=>{
        console.log("ERRRRRROR");
        
        console.log(e);
        response = e
    })
    console.log("Paginas cargadas: "+response.length);
        
    return response
}

const query= `
    SELECT 
    (select token from squint_user_pages where page_id=page_id order by last_update_date desc limit 1  ) as page_token,
    page_id,
    (select t2.long_time_token from squint_user_pages t1   INNER JOIN
    squint_user_network_token t2 ON t1.user_id = t2.user_id  where page_id=page_id order by t1.last_update_date desc limit 1  ) AS user_token
    FROM
    squint_user_pages t1
    group by page_id
`