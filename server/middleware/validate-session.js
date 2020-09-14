const jwt = require('jsonwebtoken');
const user = require('../db').import('../models/user');

const validateSession =(req,res, next) =>{
    if(req.method === 'OPTIONS')
{
    next()
}    else{

    const token =req.headers.authorization;
    console.log('token -->', token)
        jwt.verify(token,process.env.JWT_SECRET, (err, decodeToken) => {
            console.log('decodeToken-->',decodeToken);
            if(!err && decodeToken){
                user.findOne({
                    where:{
                        id:decodeToken.id
                    }
                })
                .then(user =>{
                    
                    if(!user) throw err;
                    console.log('user-->',user);
                    req.user =user;
                    console.log('next-->',next);
                    return next();
                })
                .catch(err => next(err));
            } else {
                req.errors =err;
                return res.status(500).send('Not Authorized');
            }
        });
    }
    
};

module.exports = validateSession;