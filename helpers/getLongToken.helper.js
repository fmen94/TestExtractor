const query = require("./query.helper")
const fetch = require('node-fetch');


module.exports = LongTokenFB = async (shortToken) => {
  let LongToken ={}
        await fetch(`https://graph.facebook.com/v5.0/oauth/access_token?grant_type=fb_exchange_token&client_id=747672342355413&client_secret=e7229b5684f3fb7f9f3e7b5093ae0f00&fb_exchange_token=${shortToken}`)
        .then(res => res.json())
        .then(res=> LongToken = res.access_token)
        return LongToken
}