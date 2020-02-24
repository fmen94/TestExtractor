
const fetch = require('node-fetch');


module.exports = callETL=async (page,feed)=>{
    let response=[]
    if(page){
      await fetch (`http://ec2-54-85-49-168.compute-1.amazonaws.com:3000/api/v1/submit/FBv2_JobPageCountersAPI`)
      .then(res => res.json())
      .then(resp =>{
          response.push(resp)
      })
      .catch(e=>{
          response.push(e)
      })
    }
    if(feed){
      await fetch (`http://ec2-54-85-49-168.compute-1.amazonaws.com:3000/api/v1/submit/FBv2_JobFeedCountersAPI`)
      .then(res => res.json())
      .then(resp =>{
          response.push(resp)
      })
      .catch(e=>{
          response.push(e)
      })

    }
   
    return response
  }