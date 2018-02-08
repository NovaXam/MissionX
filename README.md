# Project overview

Heroku - [https://missionmarsx.herokuapp.com/](https://missionmarsx.herokuapp.com/)

## Project description

MissionX has a educational purpose and allows users get known about current NASA’s space missions on Mars and to explore this planet from picture getting directly from rovers OPPORTUNITY, SPIRIT and CURIOSITY fulfilling scientific missions on Mars starting from 2006 till nowadays. Moreover, MissionX gives users an opportunity to look up not only the past but the future of the Mars’s exploration…

## Legend

> INSPIRATION: Idea of the project was drawn on from the recent science achievement of humanity and especially project SpaceX toward the colonization of the Red Planet.

> DESIGN: main visual solution was borrowed from old-fashion science-fiction movie “TOTAL RECALL”.

> TECHNICAL SUPPORT: the project became real thanks to NASA API and GIANT work these guys have done to bring a future closer to us.

![alt text](https://github.com/NovaXam/MissionX/blob/master/client/src/assets/total-recall.png "Logo")

## Installation

- Fork it to your github account
- Clone it to your local machine
- Go to migration folder in "MissionX/db/migration/" and then type psql
- Create database by typing in psql CREATE DATABASE mission_x_dev
- Create table by typing psql -f migration.sql inside the "./migration" folder
- In "MissionX" directory "MissionX/", type npm install - to install all the dependences for node.js!
- Then do same in "/client" directory for REACT.
- You are ready to GO! 
- Inside the "MissionX/" type npm run dev to start the server on http://localhost:3001/
- Inside the "MissionX/client" type npm start to start the server on http://localhost:3000/

## Technologies

- React.js
- HTML5
- CSS3
- Node.js
- Express.js
- PSQL
- JWT
- Bcrypt
- NASA API
- JSX
- External Labraries

## Wireframes

![alt text](https://github.com/NovaXam/MissionX/blob/master/wireframes/mapping.JPG "mapping")

![alt text](https://github.com/NovaXam/MissionX/blob/master/wireframes/pages.JPG "pages")

![alt text](https://github.com/NovaXam/MissionX/blob/master/wireframes/pages_1.JPG "pages")

![alt text](https://github.com/NovaXam/MissionX/blob/master/wireframes/db.JPG "db")

![alt text](https://github.com/NovaXam/MissionX/blob/master/wireframes/front_page.png "front page")

![alt text](https://github.com/NovaXam/MissionX/blob/master/wireframes/rovers_page.png "rovers page")

![alt text](https://github.com/NovaXam/MissionX/blob/master/wireframes/login_page.png "login page")

![alt text](https://github.com/NovaXam/MissionX/blob/master/wireframes/gallary.png "gallary")

***

## User story

On the first page user is told brief overview of the project.
There are two ways to explore a web app from that point. 
One is following a hyperlink inside of the narration. Second is a horizontal menu shortcut leads to any page.
On the Rovers page user may explore a mission of each particular rover. 
As well there is a way to get into a deeper level of a mission, a rover's gallary page.
On the gallary page by default user gets a chunk of pictures from NASA servers to 
a particular date. To explore another date's shooting history there is a calendar
on the page.
To allow user to navigate throughout the other rovers' gallaries from the actual
one there is a fancy navigation bar below the calendar.
User has an option to create and manage his own album where he / she could store, delete 
pictures from rovers gallaries. For this purpose, there is an option to create user personal account / Sing in and Log in /.

Time countdown at the bottom of the pages has a double meaning.
It was built with an idea to keep track the date of SpaceX mission.
But more fancy context is to treat it like a Marsian time before human will have been there.


## Project management

MVP - completed
 - Creating a timescope of the project
 - Elaborating an original concept
 - Visualizing a solution
 - Testing a vasual solution
 - Making up a final UI
 - Creating a code backbone structure of the project
    - db
    - middleware
    - routes
    - server
    - react components
 - Writing tests for small components
 - Gathering small components into modules
 - Making a alpha-testing of assembled project
 - Creating design elements
 - Filling content on the pages

Version 1.001 - completed
 - create user account
 - protect user data

Version 1.002 - uncompleted
 - improve UX
 - integrate 3D model of Mars into gallary page
 - refactor react components making them more reusable 

## Workflow

Functionality | Priority | Estimated time, h | Invested time, h 
--- | :---: | :---: | ---:
`Server` | `H` | `16` | `18`
`Db` | `H` | `8` | `8`
`React` | `H` | `24` | `25` 
`API` | `H` | `6` | `5`
`Testing` | `H` | `8` | `8`
`Design` | `H` | `24` | `23`
`User account` | `L` | `16` | `18`
`Security` | `H` | `16` | `16`
`Total` |  | `118` | `121` 

## Code Snippet

```
//NODE.js SERVER

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
app.use(express.static('./client/build'));

/*exprees middleware to check a valide token*/
app.use((req, res, next) => {
  ...
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


//REACT STATEFUL COMPONENT

//Method to add new picture to user album
  handleSaveListener(event) {
    event.preventDefault();
    const index = event.target.getAttribute('photo_id');
    console.log(index);
    const newElem = this.state.pictures.filter((elem) => {
      if (elem.id == index) {
        return elem;
      }
    });
    axios({
      method: 'POST',
      url: 'https://missionmarsx.herokuapp.com/api/rovers',
      data: {
        photo_id: newElem[0].id,
        url: newElem[0].img_src,
        earth_data: newElem[0].earth_date,
        rover_name: newElem[0].rover.name,
        status: newElem[0].rover.status,
        user_id: this.state.userId,
        landing_date: newElem[0].rover.landing_date,
      },
      headers: {
        authorization: `JWT ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.data.code === '22P02' || res.data.message === 'Please login') {
            alert('please login first to add this pictures to your album');
        } else if (res.data.code === '23505') {
            alert('this picture already exist in your albume');
        } else  if(res.data === 'item is added') {
            alert('you just add new item to your album');
        }
      }).catch((err) => {
        console.log(err);
      });
  }

```




