const express = require('express');
const router  = express.Router();
const Generate = require('../services/generate.servise')
const callETL = require('../helpers/callETL.helper')
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
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





module.exports = router;

