const jwt  = require('jsonwebtoken')
const User = require('../model/User')
const cryptography = require('./cryptography')


const auth = async (req,res,next) => {

  try {
        const token = req.header('Authorization').replace('Bearer', '').trim()
                
        const decoded  = jwt.verify(token, 'secret')
       
        //To decrypt the encrypted UserId
        const Decrypt = cryptography.decrypt('mySecretSalt')
        const DecryptedUserID = Decrypt(decoded._id) 

        const user  = await User.findOne({ _id:DecryptedUserID, 'tokens.token': token})

        if(!user){
            throw new Error()
        }

        req.token = token
        req.user = user

        next()
        
    } catch (error) {
        res.status(401).send({error:'Please authenticate!'})
    }
}

module.exports = auth