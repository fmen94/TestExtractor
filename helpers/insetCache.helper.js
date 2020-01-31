const conection= require("./conecDB.helper")
const fetch = require('node-fetch');


module.exports = inserCache=async (info, email)=>{
  let query = `INSERT INTO squint_cache_users (first_name, last_name, username,network_user_id,long_time_token,long_time_token_network,page_id,page_name,token_page_user,network_page) VALUES ${info};`
  let response = 0
  await conection(query).then(async e=>{
    response= 1
    await conection(`usp_procesa_user_token ('${email}')`).then(e=>{
      return "ok"
    })
  })
  return response
  }