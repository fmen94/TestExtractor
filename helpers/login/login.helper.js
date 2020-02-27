const conection = require('../conecDB.helper')

module.exports=async (req,res,next)=>{
    let body = req.body
    await conection(`call usp_create_user('${body.action}', 
                    '${body.email}',  
                    '${body.password}',
                    '${body.firstName}', 
                    '${body.lastName}', 
                    '${body.id}')`)
        .then(e=>{
            return res.send(e)
        })
}
