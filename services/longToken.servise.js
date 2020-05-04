const getTokens = require("../helpers/getTokens.heper")
const allSettled = require('promise.allsettled');
const getLongToken = require('../helpers/getLongToken.helper')
const inserCache = require('../helpers/insetCache.helper')
const getIG = require('../helpers/getIGusername.helper')
allSettled.shim();
module.exports = longToken=async(user,owner,con)=>{
    let userLT = await getLongToken(user.token) 
    let pages =await getTokens(userLT,null,null,null,true)
    let tokens= pages.map(e=>getLongToken(e.access_token)) 
    let igInfo= pages.map(e=>e.instagram_business_account? getIG(e.instagram_business_account.id,e.id,e.access_token): null )
    let response
    await Promise.allSettled([...tokens,...igInfo])
    .then(t=>{
        let _= "','"
        response = t.reduce((obj,e,index)=>{
            let igData
            let igUsername=''
            let igIBA=''
            if(index<pages.length){
                if(pages[index].instagram_business_account){
                     igData = t.find(e=>e.value!=null&&e.value.instagram_business_account&&(e.value.instagram_business_account==pages[index].instagram_business_account.id))
                     igUsername= igData? igData.value.username : null
                     igIBA = igData? igData.value.instagram_business_account : null
                }
            obj= obj+" ( '"+replText(user.firstName)+_+
            replText(user.lastName)+_+
            replText(owner.id)+_+
            replText(owner.email)+_+
            replText(user.id)+_+
            replText(user.email)+_+
                "1"+_+
            replText(user.token)+_+
                "FB"+_+
            replText(pages[index].id)+_+
            replText(pages[index].name)+_+
            replText(igUsername)+_+
            replText(igIBA)+_+
            replText(e.value)+_+
                "FB"+_+
            replText(user.photo)+_+
            replText(pages[index].picture.data.url)+"' )" 
            }
            if(index<pages.length-1) {obj= obj+","}
            return obj
        },"")
    })
    .catch(e=>{
        console.log("ERRRRRROR"); 
        console.log(e);
        response = e
    })  
    return inserCache(response, owner.email,con) 
}


replText=(text)=>{
    
    
    return text? text.replace("'", "´"): "";
}