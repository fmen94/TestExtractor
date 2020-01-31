const getTokens = require("../helpers/getTokens.heper")
const allSettled = require('promise.allsettled');
const getLongToken = require('../helpers/getLongToken.helper')
const inserCache = require('../helpers/insetCache.helper')
allSettled.shim();
module.exports = longToken=async(user)=>{
    let userLT = await getLongToken(user.token)
    let pages =await getTokens(userLT,null,null,null,true)
    let tokens= pages.map(e=>getLongToken(e.access_token))
    let response
    await Promise.allSettled(tokens)
    .then(t=>{
        let _= "','"
        response = t.reduce((obj,e,index)=>{
            obj= obj+" ( '"+user.firstName+_+user.lastName+_+user.email+_+user.id+_+user.token+_+"FB"+_+pages[index].id+_+pages[index].name+_+e.value+_+"FB"+"' )" 
            if(index+1 !=t.length) {obj= obj+","}
            return obj
        },"")
    })
    .catch(e=>{
        console.log("ERRRRRROR"); 
        console.log(e);
        response = e
    })  
    return inserCache(response, user.email) 
}
