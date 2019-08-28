const express = require('express')
const router = express.Router()
const _ = require('lodash')
const { User } = require('../Model/User')
const {authenticateUser} = require('../Middlewares/authentication')

//localhost:3005/users/register
router.post('/register', (req,res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then(user => {
            // res.json(user)
            res.json(user)
        })
        .catch(err =>{
            res.send(err)
        })
})
//localhost:3005/users/login
router.post('/login', (req,res) =>{
    const body = req.body  
    User.findByCredentials(body.email, body.password)
        .then(user => {
            return user.generateToken()
        })
        .then(token =>{
            // res.setHeader('x-auth',token).send({})
            res.send({token})
            res.send(_.pick(user, ['_id','username','email','createdAt']))
        })
        .catch(err => {
            res.send(err)
        })
})
//localhost:3005/users/account
router.get('/account',authenticateUser, (req,res)=>{
    const {user} = req
    // res.send(user)
    res.send(_.pick(user, ['_id','username','email','Admin','password']))
})
//localhost:3005/users/info
router.get('/info',authenticateUser, (req,res) =>{
    User.find()
    .then((users) => {
        res.json((users.map(user => 
        {
            if(!user.Admin){
                return(_.pick(user,['_id','email']))
            }
        }
        )))        
    })
    .catch((err) => {
        res.send(err)
    })

})
//localhost:3005/users/reset/id
router.put('/reset/:id', (req,res) =>{
    // const id = req.params.id
    const body = req.body
    const {user} = req
    console.log(body.email)
    User.findByCredentials(body.email, body.passwordCheck)
        .then(user => {
            User.findByIdAndUpdate({
                user: user._id
            }, { $set: {password: body.confirm} }, {new: true, runValidators: true})
            .then((user) => {
                if(!user){
                    res.send(_.pick(user, ['_id','username','email','createdAt']))
                }
                res.json(user)
            })
            .catch((err) => {
                res.json(err)
            })
        })
        .then(token =>{
            res.send(_.pick(user, ['_id','username','email','createdAt']))
        })
        .catch(err => {
            res.send(err)
        })
})
//localhost:3005/users/logout
router.delete('/:id',authenticateUser, (req,res) =>{
    const id = req.params.id
    User.findByIdAndDelete({_id:id})
        .then(function(){
            res.send({notice:`user with ${user._id} is deleted`})
        })
        .catch(function(err){
            res.send(err)
        })
})
//localhost:3005/users/logout
router.delete('/logout',authenticateUser, (req,res) =>{
    const { user, token } = req
    User.findByIdAndUpdate(user._id,{$pull: {tokens: { token: token }}})
        .then(function(){
            res.send({notice:'successfully logged out'})
        })
        .catch(function(err){
            res.send(err)
        })
})
module.exports = {
    usersRouter: router
}