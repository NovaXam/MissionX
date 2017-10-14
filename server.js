/*all important dependencies*/
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const pgp = require('pg-promise');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

/*instance of express framework*/
const app = express();

/*initialize a connection between front and back-end*/
app.use(cors());

/*imply necessary dependencies for express*/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

/*exprees middleware to check a valide token*/
app.use((req, res, next) => {
  console.log('next step');
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET, (err, decode) => {
      if(err) {
        req.user = undefined;
        return res.json({message: 'Please login'});
      }
      req.user = decode;
      console.log('go to next level');
      next();
    })
  } else {
      req.user = undefined;
      next();
    }
});

/*create port*/
const PORT = process.env.PORT || 3001;

/*start listening port*/
app.listen(PORT, () => {
  console.log(`I am listening port ${PORT}`);
});

/*due to the following path redirect to routes*/
const missionRoutes = require('./routes/missionRoutes');
app.use('/api', missionRoutes);


app.get('*', (req, res) => {
  res.status(404).send('Ooops!');
});
