const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//REGISTER THE USER
router.post('/register', async (req, res) => {
  try {
    //generating salt
    const salt = await bcrypt.genSalt(10);
    const hassedPas = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hassedPas,
    })

    //saving the user to database
    const user = await newUser.save();
    res.status(200).json(user);
    
  } catch (error) {
    res.status(500).json(error);
  }
})

//LOGIN 
router.post('/login', async (req, res) => {
  try {
    //finding user by email
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("User not found");

    //checking the password
    const validpass = await bcrypt.compare(req.body.password, user.password);
    !validpass && res.status(400).json("Incorrect credential");

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;