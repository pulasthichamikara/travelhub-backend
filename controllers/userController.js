const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const jwt = require('jsonwebtoken');
const jwtseacret = 'asdsdfwersf';

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const userDocument = await UserModel.findOne({ email });
    if (userDocument) {
      const passwordOk = await bcrypt.compareSync(
        password,
        userDocument.password
      );
      if (passwordOk) {
        jwt.sign(
          {
            id: userDocument._id,
          },
          jwtseacret,
          {},
          (err, token) => {
            if (err) {
              throw err;
            } else {
              //res.cookie('token', token).json('login sucessfull');
              res.json({
                token: token,
                name: userDocument.name,
                email: userDocument.email,
              });
            }
          }
        );
      } else {
        res.status(404).json('password not matching');
      }
    } else {
      res.status(404).json('canot find any record for this email');
    }
  },

  register: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user = await UserModel.create({
        name,
        email,
        password: await bcrypt.hash(password, salt),
      });

      res.json(user);
    } catch (e) {
      res.status(422).json(e);
    }
  },
};
