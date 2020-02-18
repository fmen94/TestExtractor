const express = require('express');
const router  = express.Router();
const Generate = require('../services/generate.servise')
const callETL = require('../helpers/callETL.helper')
const logToken= require("../services/longToken.servise")
const autGenerate = require("../services/aut.servise")

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});
router.get('/status', (req, res, next) => {
  res.status(200).send("ok");
});


router.get('/generate',async (req, res, next) => {
  await Generate(req.body.id,req.body.page,req.body.feed,req.body.records).then(e=>{
    req.body.etlProcess? callETL(req.body.page,req.body.feed): null
    res.send(e)
  })
  .catch(e=>{
    console.log("ERROR");
    console.log(e);
    res.send(e)
    
  })

});

router.post('/token',async (req,res,next)=>{
  res.send({create : await logToken(req.body.user)}) 
})

router.get('/generate/aut', (req,res,next)=>{
   autGenerate(req.query.records).then(e=>{
     res.send("ok")
   })
   .catch(e=>{
     console.log("Error generate"+e);
     
   })

})



module.exports = router;

