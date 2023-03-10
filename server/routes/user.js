
const User = require('../model/user');
const router = require("express").Router();
const dotenv = require('dotenv')
const twilio = require('twilio');
dotenv.config();
const otp = Math.floor(100000 + Math.random() * 900000);
const client = twilio(process.env.Account_SID, process.env.auth_Token);
const session = require("express-session");






router.post("/register", async (req, res) => {
  try {
    const { username, password, confirmpassword ,phoneNumber} = req.body;
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "user already exist" });
    }
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "password doesnot match" });
    }
    user = await User.create({ username, password,phoneNumber });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});

// login

// router.post("/login", async (req, res) => {
//     try {
//       const { username, password } = req.body;
//       let user = await User.findOne({ username }).select("+password");
//       if (!user) {
//         return res.status(400).json({ message: "user doesnot exist" });
//       }
//       const isMatch = await user.matchPassword(password);
//       if (!isMatch) {
//         return res.status(401).json({ message: "incorrect password" });
//       }
//       const token = await user.generateToken();
//       const expiryDate = {
//         expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
//         httpOnly: true,
//       };
//       res.status(200).cookie("token", token, expiryDate).json({ user, token });
      
//     } catch (error) {
//       console.log(error);
//     }
//   });




router.post("/login", async (req, res) => {
  try {
    const { username, password,phoneNumber } = req.body;
    let user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "user doesnot exist" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "incorrect password" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    client.messages.create({
   
      to: `+91${user.phoneNumber}`,
      from: '+15674122224',
      body: `Your OTP is ${otp}`,
    });
     const token = await user.generateToken();

    const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }

        res.status(201).cookie("token", token, options).json({
            success: true,
            user,
            token,
        })
    // save the OTP in the user's session or in a database
    // req.session.otp = otp;
    // console.log(req.session.otp);
    // req.session.userId = user._id;
    // console.log(req.session.userId);
     // res.status(200).json({ message: "OTP sent" });
  } catch (error) {
    console.log(error);
  }
});


router.post("/verify-otp/:id", async (req, res) => {
  try {
    const { otp } = parseInt(req.body);
    const userId = req.params.id;
    console.log(userId);
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "user doesnot exist" });
    }
    if (otp != req.session.otp) {
      return res.status(401).json({ message: "incorrect OTP" });
    }
    // const token = await user.generateToken();
    // const expiryDate = {
    //   expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    //   httpOnly: true,
    // };
     res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
});


// logout
  router.get("/logout", async (req, res) => {
    try {
      req.session.destroy();
      await res
        .status(200)
        .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
        .json({ message: "signout" });
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
