const express = require('express');
const router = express.Router();
const validateSession = require('../middleware/validate-session');

const Review = require('../db').import('../models/review');

//practice route for testing 
// router.get('/practice,function(req,res){
   // res.send('Hey!! This id s review practice route')
//})

// creating a new rewiew -WORKS

router.post('/create',validateSession,(req,res)=>{
    const reviewEntry ={
        title:req.body.review.title,
        shoeName:req.body.review.shoeName,
        brandName:req.body.review.brandName,
        rating:req.body.review.rating,
        description:req.body.review.description,
        author:req.user.username,
        owner:req.user.id
    }
    Review.create(reviewEntry)
    .then(reviews => res.status(200).json(reviews))
    .catch(err => res.status(500).json({error:err}))
});

// Getting a review by title

router.get('/:title',function(req,res){
    let title = req.params.title;

    Review.findAll({
        where:{title:title}
    })
    .then(reviews => res.status(200).json(reviews))
    .catch(err => res.status(500).json({error:err}))
});

router.get('/:shoeName',function(req,res){
    let shoeName =req.params.shoeName;

    Review.findAll({
        where:{shoeName:shoeName}
    })
    .then(reviews => res.status(200).json(reviews))
    .catch(err => res.status(500).json({error:err}))
});
//Get all user reviews

router.get('user/mine', validateSession, function (req,res){

    Review.finAll({
        where:{ owner:req.user.id}
    })
    .then(reviews => res.status(200).json(reviews))
    .catch(err => res.status(500).json({error:err}))
});

//Get all reviews

router.get("/", function (req,res) {

    Review.findAll()
    .then(review => res.status(200).json(review))
    .catch(err => res.status(500).json({error:err}))
})

//Updating a review

router.put('/:id',validateSession,function(req,res){
    const updateReviewEnrty ={
        title: req.body.review.title,
        rating: req.body.review.rating,
        description: req.body.review.description,
    };

    const query ={ where: { id: req.params.id, owner: req.user.id}};

    Review.update(updateReviewEnrty, query)
    .then((review) => res.status(200).json(review))
    .catch((err) => res.status(500).json({error:err}));
})

// Deleting a review 

router.delete('/delete:/id', validateSession, function(req,res){
    const query ={ where: { id:req.params.id, owner: req.user.id}};

    Review.destroy(query)
    .then(() => res.status(200).json({message: 'Review Removed'}))
    .catch((err) => res.status(500).json({error:err}));
})




module.exports = router;
