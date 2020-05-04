

module.exports = inserCache=async (info, email,conection)=>{
  let query = `INSERT INTO squint_cache_users (first_name, last_name, squint_user_id, squint_user_email, network_user_id, credential_email_network, owner_account, long_time_token, long_time_token_network, page_id, page_name, user_name, internal_code, token_page_user, network_page,network_user_image,page_image) VALUES ${info};`
  let response = 0
  await conection.query(query).then(async e=>{
    response= 1
    
    await conection.query(`call usp_procesa_user_token(?)`,[email]).then(el=>{
      console.log("SP ok");
      console.log(el);
      response= el
      return "ok"
    })
  }).catch(e=>{
    console.log("Inser error of "+ email);
    console.log(e);
    
  })
  return response
  } 