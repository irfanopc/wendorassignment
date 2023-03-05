



// const OTP = require('otp');
// const router = require("express").Router();
// const Product = require('../model/product');
// const User = require('../model/user');
// const twilio = require('twilio');

// // Configure Twilio client with your account SID and auth token
// const accountSid = 'AC4b524c2df0db7b13e878f29891ba3153';
// const authToken = '9d03728cea4a4009ab822e9cad8bd5be';
// const client = new twilio(accountSid, authToken);

// // Generate a four-digit OTP
// const generateOTP = () => {
//   const otp = new OTP();
//   return otp.totp({
//     digits: 4,
//     digest: 'sha256',
//     step: 300 // OTP validity period in seconds
//   });
// };

// // Save the generated OTP to the user's document and send an SMS message with the OTP
// const saveOTPAndSendSMS = async (mobileNumber) => {
//   const otp = generateOTP();
//   const user = await User.findOneAndUpdate({ mobileNumber }, { otp }, { new: true });

//   // Send SMS message with the OTP
//   try {
//     await client.messages.create({
//       body: `Your OTP for verification is: ${otp}`,
//       from: 'your_twilio_phone_number',
//       to: mobileNumber
//     });
//   } catch (err) {
//     console.error(err);
//   }

//   return user;
// };

// // Verify the user-entered OTP
// const verifyOTP = async (mobileNumber, enteredOTP) => {
//   const user = await User.findOne({ mobileNumber });
//   if (user.otp === enteredOTP) {
//     // OTPs match, update verifiedMobile field to true
//     await User.findOneAndUpdate({ mobileNumber }, { verifiedMobile: true });
//     return true;
//   }
//   return false;
// };

// // Endpoint for generating and saving OTP to user document and sending SMS
// router.post("/api/generateOTP", async (req, res) => {
//     const { mobileNumber } = req.body;
  
//     try {
//       // Save the generated OTP to the user's document and send SMS
//       console.log("mobileNumber:", mobileNumber);
//       const user = await saveOTPAndSendSMS(mobileNumber);
//       console.log("user:", user);
//       return res.status(200).json({ message: 'OTP generated and sent successfully' });
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // Endpoint for verifying a user's mobile number with an OTP
// router.post("/api/verifyMobile", async (req, res) => {
//   const { mobileNumber, otp } = req.body;

//   try {
//     // Verify the OTP for the given mobile number
//     const isVerified = await verifyOTP(mobileNumber, otp);

//     if (!isVerified) {
//       return res.status(401).json({ message: 'Invalid OTP' });
//     }

//     return res.status(200).json({ message: 'Mobile number verified' });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Endpoint for adding a new product with an image URL
// router.post("/api/cartItems", async (req, res) => {
//   const { imageUrl, id } = req.body;

//   try {
//     // Create a new product document and save it to the database
//     const product = new Product({ imageUrl, id });
//     await product.save();

//     // Find the user with the given mobile number and add the new product to their list
//     const user = await User.findOne({ mobileNumber: req.user.mobileNumber });
//     user.products.push(product._id);
//     await user.save();

//     return res.status(200).json({ message: 'Product added to cart' });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const Product = require('../model/product')
const User = require("../model/user");
const authMiddleware = require('../middleware/auth');
router.post("/addcart",authMiddleware, async (req, res) => {
  try {
    const { username } = req.body;
    let user = await User.findOne({ username });
    const { imageUrl } = req.body;
    const product = await Product.create({ imageUrl });
    user.products.push(product);
    await user.save();
    res.status(200).send({ product });
  } catch (error) {
    console.log(error);
    res.redirect('/login'); // Redirect to login page
  }
});

router.get("/cartitems/:id",authMiddleware,async (req, res) => {
  try {
    const { id: userId } = req.params;
    const cartitems = await User.find({ _id: userId }).populate(
      "products"
    );
    if (!cartitems) {
      return res.status(400).json({
        success: false,
        message: "no items",
      });
    }

    if (cartitems) {
      res.status(200).json({
        success: true,
        cartitems,
      });
    }
  } catch (error) {
    console.log(error);
   
  }
});

router.delete('/deleteitem/:id', authMiddleware,async (req, res) => {
  try {
    const { id: TaskID } = req.params;
    const task = await Product.findByIdAndDelete({ _id: TaskID });
    if (!task) {
      return res.status(404).json({ msg: `no task with id ${TaskID}` });
    }
    // Remove the product id from the user schema
    const user = await User.findOneAndUpdate(
      { products: TaskID },
      { $pull: { products: TaskID } },
      { new: true }
    );
    res.status(201).json({ task, user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});




  module.exports = router;
