const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.JWT_SAULTROUNDS);
const salt = bcrypt.genSaltSync(saltRounds);
const jwt = require('jsonwebtoken');
const jwtseacret = process.env.JWT_SECRET;

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const userDocument = await UserModel.findOne({ email });

      if (!userDocument) {
        return res
          .status(401)
          .json({ error: 'Cannot find any record for this email' });
      }

      const passwordOk = await bcrypt.compare(password, userDocument.password);

      if (!passwordOk) {
        return res.status(400).json({ error: 'Password not matching' });
      }

      jwt.sign({ id: userDocument._id }, jwtseacret, {}, (err, token) => {
        if (err) {
          res.status(500).json({ error: err });
        }
        res.json({
          token: token,
          name: userDocument.name,
          email: userDocument.email,
        });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  },
  register: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const userDocument = await UserModel.findOne({ email });
      if (userDocument) {
        res.status(422).json({ error: 'this email is already used' });
      } else {
        const user = await UserModel.create({
          name,
          email,
          password: await bcrypt.hash(password, salt),
        });

        res.status(201).json({ userId: user._id });
      }
    } catch (e) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  },
};
