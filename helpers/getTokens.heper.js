const fetch = require('node-fetch');
const callGraph = require("./callGraph.helper")




module.exports= getTokens = async (userToken,page,feed,records)=>{
    let respuesta ={}
    await fetch(`https://graph.facebook.com/v5.0/me/accounts/?access_token=${userToken}&fields=access_token,id,name,cover,picture,username,instagram_business_account,displayed_message_response_time,engagement,unread_message_count,unseen_message_count,fan_count&limit=100&summary=total_count`)
        .then(res => res.json())
        .then(res=> respuesta = res)
    return respuesta.data? respuesta.data.map(e=>callGraph(e.id,e.access_token,userToken,page,feed,records)) : []
}
