const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userController = {};

/*registrations of new user middleware and crypting a password */
userController.reg = (req, res, next) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  console.log(req.body);
  userModel.save(req.body)
  .then(() => {
      res.send('new user added');
  }).catch(err => {
      console.log(err);
      res.status(405).send({ "message": `user wasn't register ${err}` });
  })
}

/* login registered user middleware, create token and pass it to client*/
userController.sign_in = (req, res) => {
  userModel.findOne(req.body.userIn)
  .then((UserIn) => {
      console.log(UserIn.id);
      if(!UserIn) {
        res.status(405).json({ message: "Authentication failed. User not found" });
        }
      else {
          if(!userModel.comparePassword(req.body.userIn.password, UserIn.password)) {
            res.status(403).json({ message: "Authentication failed. Wrong password"})
          }
          else {
            res.json({
              token: jwt.sign({ username: UserIn.name, id: UserIn.id }, 'darkWaider', { expiresIn: 60000 }),
              id: UserIn.id,
            });
          }
        }
    }).catch(err => {
      console.log(err);
      res.status(403).json(err);
    })
  }


module.exports = userController;
