const express = require('express');
const router  = express.Router();
const Generate = require('../services/generate.servise')
const callETL = require('../helpers/callETL.helper')
const logToken= require("../services/longToken.servise")
const autGenerate = require("../services/aut.servise")
const typeorm = require("typeorm");
let con
 typeorm.createConnection( {
  type: "mysql",
  host: "ls-12d36fc3bdd65f2a11cdf23910a33767e186e18b.cnz9raiumfbl.us-east-1.rds.amazonaws.com",
  port: 3306,
  username : "squint_user_exractor01",
  password : "$Fer.Mendez@squint#",
  database : "squintadmin",
   synchronize : false,
   logging : false,
   entities : [],
   cli : {
      "entitiesDir": "app/models"
  },
   autoSchemaSync : true
}).then(e=>{
  console.log("DB conected");
  con=e})
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
  res.send({create : await logToken(req.body.user,req.body.owner,con)}) 
})

router.get('/generate/aut', (req,res,next)=>{
   autGenerate(req.query.records,con).then(e=>{
     res.send("ok")
   })
   .catch(e=>{
     console.log("Error generate"+e);
     
   })

})

const login =require('../helpers/login/login.helper')
router.post('/api/v1/login', login)



module.exports = router;

