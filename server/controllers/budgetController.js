 const router = require('express').Router();
 const Budget = require("../db").import("../models/budget");
 const validateSession = require("../middleware/validate-session");

 router.get("/",validateSession,(req,res) => {
    Budget.findAll()
    .then((budget) => res.status(200).json(budget))
    .catch((err) => res.status(500).json({error:err}));
 });

 router.get('/mine', validateSession,(req,res) =>{
     let userid =req.user.id
     Budget.findAll({
         where:{owner:userid}
     })
     .then(budget => res.status(200).json(budget))
     .catch(err => res.status(500).json({error:err}))
 })
 
 router.post("/create",validateSession,(req,res) => {
     console.log(req.body);
     const BudgetEntry ={
         title: req.body.budget.title,
         date:req.body.budget.date,
         amount:req.body.budget.amount,
         owner:req.user.id
     };
     Budget.create(BudgetEntry)
     .then((budget) => res.status(200).json(budget))
     .catch((err) => res.status(500).json({error:err}));
 });

 router.put("/update:/entryId", validateSession, function(req,res){
     const updateBudgetEntry ={
         title:req.body.budget.title,
         date:req.body.budget.date,
         amount:req.body.budget.amount,
     };

     const query ={where:{id:req.params.entryId, owner: req.user.id}};

    Budget.update(updateBudgetEntry,query)
    .then((budget) => res.status(200).json(budget))
    .catch((err) => res.status(500).json({error:err}));
 });

 router.delete("/delete/:id",validateSession, function (req,res){
     const query ={where:{ id:req.params.id, owner:req.user.id}};

     Budget.destroy(query)
     .then(() =>res.status(200).json({message:"Entry Removed"}))
     .catch((err) => res.status(500).json({error:err}));
 });

 module.exports=router;