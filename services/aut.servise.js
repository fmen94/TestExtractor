const getTokens = require("../helpers/getTokens.heper")
const allSettled = require('promise.allsettled');
const callGraph = require("../helpers/callGraph.helper")
const callETL = require('../helpers/callETL.helper')
allSettled.shim();
module.exports = generateAut=async(records,conection)=>{
    let calls
    await conection.query(query).then(e=>{
        calls=e.map(e=>{
            return callGraph(e.page_id,e.page_token,e.user_token,true,true,records)
        })
    })
    let response
    await Promise.allSettled(calls)
    .then(e=>{
        e.length>0? callETL(true,true): null
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
select * ,
(select long_time_token from squint_user_network_token where network_user_id= page.user order by last_update_date desc limit 1 ) as user_token 
 from(
select t1.page_id, 
(select token from squint_user_pages a where a.page_id= t1.page_id order by last_update_date desc limit 1 )as page_token,
(select network_user_id from squint_user_pages a where a.page_id= t1.page_id order by last_update_date desc limit 1)as user
from squint_pages t1 
where t1.network_id = "FB") as page;
`