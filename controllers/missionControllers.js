const missionModel = require('../model/missionModel');
const userModel = require('../model/userModel');

const missionController = {};

missionController.index = (req, res) => {
  missionModel.findAll(req.body)
  .then((items) => {
    res.send(items)
  }).catch(err => {
      console.log(err);
      res.send('empty');
  })
}

missionController.create = (req, res) => {
  missionModel.create(req.body)
  .then((item) => {
      res.send("item is added");
  })
  .catch(err => {
      console.log(err);
      res.send(err);
  });
}

missionController.destroy = (req, res) => {
  missionModel.destroy(req.body)
  .then(() => {
    res.send('item successfully deleted');
  }).catch(err => {
    res.status(405).json(err);
  })
}

missionController.getApi = (req, res) => {
  res.json({
    message: 'got a key',
    data: {
      key: process.env.api_key,
      secret: process.env.SECRET,
    }
  });
}

module.exports = missionController;
