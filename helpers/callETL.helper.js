const query= require("./query.helper")
const fetch = require('node-fetch');


module.exports = callETL=async (page,feed)=>{
    let response=[]
    if(page){
      await fetch (`http://ec2-54-236-7-101.compute-1.amazonaws.com:8081/api/v1/process/FBv2_JobPageCountersAPI`)
      .then(res => res.json())
      .then(resp =>{
          response.push(resp)
      })
      .catch(e=>{
          response.push(e)
      })
    }
    if(feed){
      await fetch (`http://ec2-54-236-7-101.compute-1.amazonaws.com:8081/api/v1/process/FBv2_JobFeedCountersAPI`)
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