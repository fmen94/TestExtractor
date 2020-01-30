const conection= require("./conecDB.helper")
const fetch = require('node-fetch');


module.exports = inserCache=async (info)=>{
  let query = `INSERT INTO squint_cache_users (first_name, last_name, username,network_user_id,long_time_token,long_time_token_network,page_id,page_name,token_page_user,network_page) VALUES ${info};`
  let response = 0
  await conection(query).then(e=>{
    response= 1
  })
  return response
  }