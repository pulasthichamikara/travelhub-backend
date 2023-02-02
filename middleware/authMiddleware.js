const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const UserModel = require('../models/UserModel');

module.exports = {
  protect: asyncHandler(async (req, res, next) => {
    let token;
    /* console.log('headers', req.headers.authorization); */
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserModel.findById(decoded.id).select('-password');
      } catch (err) {
        res.status(401);
        throw new Error('Not autorized');
      }
    }
    if (!token) {
      res.status(401);
      throw new Error('Not token');
    }

    next();
  }),
};
