const express = require('express');
const missionController = require('../controllers/missionControllers');
const userController = require('../controllers/userControllers');

const missionRoute = express.Router();

missionRoute.route('/storage')
            .post(missionController.index)
            .delete(missionController.destroy);

missionRoute.post('/rovers', missionController.create);


missionRoute.post('/registration', userController.reg);
missionRoute.post('/sign_in', userController.sign_in);

module.exports = missionRoute;
