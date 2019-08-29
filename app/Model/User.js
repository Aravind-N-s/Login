const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema 

const userSchema = new Schema ({
    username:{
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    Admin:{
        type: Boolean
    },
    password:{
        type: String,
        required: true,   
        validate:{
            validator: function(value){
                return validator.matches(value, /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/)
            },
            message: function(){
                return 'Invalid Password Format'
            }
        }     
    },
    tokens:[{
        token:{
            type: String
        },
        createdAt:{
            type: Date,
            default: Date.now
        }
    }] 
})


//own static model
userSchema.statics.findByCredentials = function(username, password){
    const User = this
    return User.findOne({username})
        .then(user =>{
            if(!user){
                return Promise.reject({errors:'invalid username/password'})
            }else{
                if(password == user.password){
                    return Promise.resolve(user)
                }else{
                    return Promise.reject({errors:'invalid Password'})
                }
            }
        }) 
        .catch(err =>{
            return Promise.reject(err)
            //return new Promise(function(resolve,reject){
            // reject(err)
            // })
        })
}

userSchema.statics.findByToken = function(token){
    const User = this
    let tokenData
    try{
        tokenData = jwt.verify(token,'jwt@123')
    }catch(err){
        return Promise.reject(err)
    }

    return User.findOne({
        _id: tokenData._id,
        'tokens.token': token
    })
}

//own  instance methods
userSchema.methods.generateToken = function(){
    const user = this
    const tokenData = {
        _id:user._id,
        username: user.username,
        createdAt: Number(new Date())
        //role etc
    }
    const token = jwt.sign(tokenData, 'jwt@123')
    user.tokens.push({
        token
    })
    return user.save()
    .then(user => {
        return Promise.resolve(token)
    })
    .catch(err =>{
        return Promise.reject(err)
    })
}

const User = mongoose.model('User', userSchema)

module.exports = {
    User
}