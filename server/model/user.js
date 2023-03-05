// const mongoose = require("mongoose");
// const userSchema = mongoose.Schema({
//     username: String,
//     mobileNumber: Number,
//     otp: Number,
   
//     verifiedMobile: {
//       type: Boolean,
//       default: false
//     },
    // products: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Product'
    // }]
//   });
  
//   const User = mongoose.model("User", userSchema);
  
//   module.exports = User;
  
  const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: [true, "user already exist"],
//   },
//   password: {
//     type: String,
//     required: [true, "Please enter a password"],
//     select: false,
//   },
//   phoneNumber :Number,
//   products: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product'
//   }]
// });
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "user already exist"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    select: false,
  },
  phoneNumber: Number,
  otp: Number,
  verifiedMobile: {
    type: Boolean,
    default: false
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')){
      this.password = await bcrypt.hash(this.password, 10);
  }
  next();
})

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateToken = async function(){
    return jwt.sign({_id:this._id}, process.env.JWT_SECRET)
}
const User = mongoose.model("user", userSchema);
module.exports = User;
