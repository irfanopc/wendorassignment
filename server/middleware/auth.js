const User = require("../model/user");
const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    try {
      let token;
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      } else if (req.cookies.token) {
        token = req.cookies.token;
      }
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //   console.log(decoded._id);
      const user = await User.findById(decoded._id);
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
  module.exports = authMiddleware;
  