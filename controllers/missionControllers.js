const missionModel = require('../model/missionModel');
const userModel = require('../model/userModel');

const missionController = {};

missionController.index = (req, res) => {
  missionModel.findAll(req.body)
  .then((items) => {
    console.log(items);
    res.send(items)
  }).catch(err => {
      console.log(err);
      res.send('empty');
  })
}

missionController.create = (req, res) => {
  console.log(req.body);
  missionModel.create(req.body)
  .then((item) => {
      res.send("item is added");
  })
  .catch(err => {
      console.log(err);
      res.send("err");
  });
}

missionController.destroy = (req, res) => {
  console.log(req.body);
  missionModel.destroy(req.body)
  .then(() => {
    res.send('item successfully deleted');
  }).catch(err => {
    res.status(405).json(err);
  })
}

module.exports = missionController;








