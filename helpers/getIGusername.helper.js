const fetch = require('node-fetch');


module.exports =async (igBissnesA,page_id,userToken)=>{
    let respuesta
    let url = `https://graph.facebook.com/v5.0/${igBissnesA}?fields=name,id,username&access_token=${userToken}`
    await fetch(url)
    .then(res => res.json())
    .then(res=> respuesta = res)
    respuesta.instagram_business_account = igBissnesA
    respuesta.page_id= page_id
    return respuesta
}