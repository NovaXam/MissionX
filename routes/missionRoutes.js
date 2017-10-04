const express = require('express');
const missionController = require('../controllers/missionControllers');
const userController = require('../controllers/userControllers');

const missionRoute = express.Router();

missionRoute.route('/user/:id/storage')
            .get(missionController.indexAll)
            .delete(missionController.destroy);

missionRoute.get('user/:id/storage/:id', missionController.indexOne);
missionRoute.post('/user/:id/rovers/:id', missionController.create);


missionRoute.post('/auth/registration', userController.reg);
missionRoute.get('/auth/signIn', userController.signIn);

module.exports = missionRoute;
