const query= require("./query.helper")
const fetch = require('node-fetch');


module.exports = callGraph=async (id,token,userToken,page,feed,records)=>{
    let response
    const options={
      method: "get",
      headers: {
        page_id: id,
        page_access_token: token,
        user_access_token: userToken
      }
    }
    let url = `http://54.209.176.80:4000/?query=${query(page,feed,records)}`
    await fetch (url,options)
    .then(res => res.json())
    .then(resp =>{
        response= resp
    })
    .catch(e=>{
        response = "error"
    })
    return response
  }