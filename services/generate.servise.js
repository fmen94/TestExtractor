const getTokens = require("../helpers/getTokens.heper")
const allSettled = require('promise.allsettled');


allSettled.shim();
module.exports = Generate=async(id,page=true,feed=false,records)=>{
    let tokens =await getTokens(id,page,feed)
    let response
    await Promise.allSettled(tokens)
    .then(e=>{
        response = e
    })
    .catch(e=>{
        console.log("ERRRRRROR");
        
        console.log(e);
        response = e
    })
    //console.log(response);
        
    return response
}
