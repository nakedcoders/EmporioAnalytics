const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const User = require("../model/User");
const Auth = require("../middleware/auth");
const redis = require('../middleware/cryptography')

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */


router.post("/signup", async (req, res) => {

    const user = new User(req.body);

    try{
        const token = await user.newAuthToken()
        res.status(201).send({token})
    }catch(e){
        res.status(400).send(e)
    }

});

router.post("/login", async (req, res) => {

  try {

      const {email, password} = req.body
    
      let user = await User.findOne({email});

      if (!user){
        return res.status(400).json({
          message: "User Not Exist"
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: "Incorrect Password"
        });
      }
      
      const token = await user.newAuthToken()
      
      return res.status(200).json({token});

  } catch (error) {
      console.log(error)
      res.status(400).send({
        message: 'Server error, please try again'
      })        
  }
});

router.get('/logout', Auth, async (req, res) => {
  try {

      // Remove one of the tokens
      req.user.tokens = req.user.tokens.filter((e) => {
        return e.token == req.token
      })

      await req.user.save()

      return res.status(200).json({
        message: "Account successfully logged out"
      });

  } catch (error) {
      console.log(error)
      res.status(500).send()
  }
})

router.get('/me', Auth, async (req,res)=> {

  
    const user = req.user

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
    })

})


module.exports = router;


