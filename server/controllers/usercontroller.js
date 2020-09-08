const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

// user signup
router.post('/signup', function(req,res){

    User.create({
        email:req.body.user.email,
        username:req.body.user.username,
        password:bcrypt.hashSync(req.body.user.password,13),
        firstName:req.body.user.firstName,
        lastName:req.body.user.lastName
    })
    .then(
        function createSucess(user){
            let token =jwt.sign({id:user.id}, process.env.JWT_SECRET,{expiresIn: 60* 60* 24});
            res.json({
                user:user,

                message:'User successfully created!',
                sessionToken:token,
                
            });
        }
    )
    .catch(err=> res.status(500).json({error:err}))
});

// user login

router.post('/login',function(req,res){
    User.findOne({
        where:{
            email:req.body.user.email
        }
    })
    .then(function loginSuccess(user){
        if(user){
            bcrypt.compare(req.body.user.password,user.password,function(err,matches){
                if(matches){
            
            let token = jwt.sign({id:user.id}, process.env.JWT_SECRET,{expiresIn: 60 * 60 * 24 })

            res.status(200).json({
                user:user,
                message:"User successfully logged in!",
                sessionToken:token,
            })

        } else {
            res.status(500).send({error:"Can't find user"});
        }
    });
    }else{
        res.status(500).json({error:"Can't find user"})
    }
})
    .catch(err => res.status(500).json({ error:err}))
});


module.exports = router;
