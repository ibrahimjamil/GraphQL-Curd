const express = require('express');
const router = express.Router();
const User = require('../model/user')
const mongoose = require('mongoose');


router.post('/createUser',async (req,res)=>{
    const user = await User.create({
        name:req.body.name,
        email:req.body.email
    })
    res.send(user)
})

router.get('/getUsers',async (req,res)=>{
    const users = await User.find({})
    res.send(users)
})

router.put('/updateUser',async (req,res) =>{
    const id = mongoose.Types.ObjectId(req.body.id);  //convert string to ObjectID
    const updatedUser = await User.findByIdAndUpdate(id,{name: req.body.name, email: req.body.email},{upsert: true, new: true})  //new true so that it return data back on update 
    res.send(updatedUser)
})

router.delete('/deleteUser/:id',async (req,res) =>{ 
    const id = req.params.id.split(':')[1]
    const id1 = mongoose.Types.ObjectId(id);  //convert string to ObjectID
    await User.findByIdAndDelete(id1,{upsert: true, new: true})  //new true so that it return data back on update 
    res.send({success:true})
})


module.exports = router