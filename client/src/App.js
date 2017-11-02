import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/partials/Footer';
import Header from './components/partials/Header';
import Rovers from './components/Rovers';
import Rover1 from './components/Rover1';
import Rover2 from './components/Rover2';
import Rover3 from './components/Rover3';
import Storage from './components/Storage';
import Mission from './components/Mission';
import LoginForm from './components/Login_form';
import SignIn from './components/Sign_in';
import Stub from './assets/space_pic.jpg';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: undefined,
      user_name: undefined,
      email: undefined,
      pictures: [],
      albume: [],
      flag: 0,
      prevObj: '',
      nextObj: '',
      signInName: '',
      signInPass: '',
      token: '',
      userId: undefined,
      key: '',
      currentTime: '',
      date: new Date(),
      bubbles: 'bubbles',
      checker: '',
    };

    this.countDown = this.countDown.bind(this);
    this.handleRoverListener = this.handleRoverListener.bind(this);
    this.handleSaveListener = this.handleSaveListener.bind(this);
    this.handleLoginListener = this.handleLoginListener.bind(this);
    this.handleNameListener = this.handleNameListener.bind(this);
    this.handlePassListener = this.handlePassListener.bind(this);
    this.handlEmailListener = this.handlEmailListener.bind(this);
    this.handleAlbumeListener = this.handleAlbumeListener.bind(this);
    this.handleDeleteListener = this.handleDeleteListener.bind(this);
    this.handleNavListener = this.handleNavListener.bind(this);
    this.handleSignInNameListener = this.handleSignInNameListener.bind(this);
    this.handleSignInPassListener = this.handleSignInPassListener.bind(this);
    this.handleSignInListener = this.handleSignInListener.bind(this);
    this.changeStat = this.changeStat.bind(this);
    this.handleRoverDateListener = this.handleRoverDateListener.bind(this);
    this.handleLogoutListener = this.handleLogoutListener.bind(this);
  }

  componentWillMount() {
    this.countDown();
    require('dotenv').config();
  }

  componentDidMount() {
    setInterval(this.countDown, 1000);
    this.stopBubbling();
  }

  // countdown clock at the bottom of the screen with
  // representation by day, hours, minuts and second
  countDown() {
    const destinationTime = new Date('Sept 17, 2024 00:00:00').getTime();
    const current = new Date().getTime();
    const distance = destinationTime - current;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    const minuts = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
    const sec = Math.floor(distance % (1000 * 60) / 1000);

    if (distance < 0) clearInterval();

    this.setState({
      currentTime: `${days} : ${hours} : ${minuts} : ${sec}`,
    });
  }

  // Reusable method to change a state's property
  changeStat(prop, response) {
    const keyObj = {};
    keyObj[prop] = response;
    this.setState(keyObj);
  }

  // Reusable method to get an API key from server
  async getKeys(elem) {
    let keyApi;
    let resultApi;
    if (elem) {
      console.log('key is downloaded');
    } else {
      try {
        keyApi = await axios('https://localhost:5000/api/info');
      } catch (err) {
        console.log(err);
      }
      resultApi = await this.changeStat('key', keyApi.data.data.key);
    }
  }

  // Methode to delete explicitely a token and finish user's session
  LogOutState() {
    if (this.state.userId) {
      console.log(`user ${this.state.userId} logged in`);
      this.setState({
        checker: 'visible',
      });
      console.log(this.state.checker);
    } else {
      console.log(`user not logged in`);
      console.log(this.state.checker);
      this.setState({
        checker: 'hidden',
      });
    }
  }

  // Method to cut Loading component
  stopBubbling() {
      this.setState({
        bubbles: '',
      });
    }

  // Method to control an internal navigation inside between rovers
  urlReturn() {
    return window.location.pathname.split('/')[2];
  }

  // universal listener for bacis api request when you get into the pages
  // of each rover. Method makes prior request to local server
  // for api key in case if it wasn't priory instanciated.
  async handleRoverListener(event) {
    let keys;
    let roverName;
    let dataApi;
    try {
      keys = await this.getKeys(this.state.key);
      roverName = await this.urlReturn();
      dataApi = await axios(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=1000&api_key=${this.state.key}`);
    } catch(err) {
        console.log(err);
    }
     this.changeStat('pictures', dataApi.data.photos);
  }

  // universal listener for api upon a particular date while pressing any number in calendar.
  // Method makes prior request to local server
  // for api key in case if it wasn't priory instanciated.
  async handleRoverDateListener(date) {
    let transDate;
    let dateProp;
    let keys;
    let dataApi;
    let roverName;
    try {
      transDate = date.toISOString().split('T')[0];
      dateProp = await this.changeStat('date', transDate);
      roverName = await this.urlReturn();
      keys = await this.getKeys(this.state.key);
      dataApi = await axios(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?earth_date=${this.state.date}&api_key=${this.state.key}`);
    } catch(err) {
      console.log(err);
    }
      this.changeStat('pictures', dataApi.data.photos);
  }

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
      url: 'https://localhost:5000/api/rovers',
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

  handleNameListener(event) {
    event.preventDefault();
    this.setState({
      user_name: event.target.value,
    });
  }

  handlePassListener(event) {
    event.preventDefault();
    this.setState({
      password: event.target.value,
    });
  }

  handlEmailListener(event) {
    event.preventDefault();
    this.setState({
      email: event.target.value,
    });
  }

  handleLoginListener(event) {
    event.preventDefault();
    console.log('inside of login');
    axios({
      method: 'POST',
      url: 'https://localhost:5000/api/registration',
      data: {
        name: this.state.user_name,
        password: this.state.password,
        email: this.state.email,
      },
    })
      .then((res) => {
        const newUserName = JSON.parse(res.config.data).name;
        this.setState({
          user_name: '',
          password: '',
          email: '',
        });
        alert(`${newUserName}, Welcome to Mars`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleAlbumeListener() {
    const id = this.state.userId;
    axios({
      method: 'POST',
      url: 'https://localhost:5000/api/storage',
      headers: {
        authorization: `JWT ${localStorage.getItem('token')}`,
      },
      data: { user_id: id },
    })
      .then((res) => {
        // const obj = {
        //   url: 'https://www.lockheedmartin.com/content/dam/lockheed/data/space/photo/mbc/MBC_Poster.jpg',
        // };
        if (this.state.userId === '' || res.data.message === 'Please login') {
          this.setState({
            albume: [{ Stub }],
          });
          alert('Please login, to see your personal albume');
        } else if (res.data === 'empty') {
          this.setState({
            albume: [{ Stub }],
          });
          alert('You album is empty');
        } else  {
          this.setState({
            albume: res.data,
          });
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  handleNavListener(event) {
    const currentElem = event.target;
    if (this.state.flag === 0) {
      currentElem.style.cssText = 'text-decoration : underline; font-size: 37px; text-shadow: 0 0 0.2em #F87, 0 0 0.2em #F87';
      this.setState((prevState) => {
        return {
          flag: prevState.flag + 1,
          nextObj: currentElem,
        };
    });
    } else {
      currentElem.style.cssText = 'text-decoration : underline; font-size: 37px; text-shadow: 0 0 0.2em #F87, 0 0 0.2em #F87';
      this.setState((prevState)  => {
        return {
          prevObj: prevState.nextObj.setAttribute('style', 'text-decoration:none; font-size:35px; text-shadow:0;'),
          nextObj: currentElem,
          flag: prevState.flag + 1,
        };
      });
    }
  }

  handleDeleteListener(event) {
    event.preventDefault();
    if (this.state.userId === '') {
      alert('you need to be logged in to activate this feature');
    }
    else {
    const indexId = event.target.getAttribute('photo_id');
    const userId = event.target.getAttribute('user_id');
    axios({
      method: 'DELETE',
      url: 'https://localhost:5000/api/storage',
      data: {
        photo_id: indexId,
        user_id: userId,
      },
      headers: {
        authorization: `JWT ${localStorage.getItem('token')}`,
      },
    })
      .then(() => {
        alert('item successfully deleted');
        axios({
          method: 'POST',
          url: 'https://localhost:5000/api/storage',
          headers: {
            authorization: `JWT ${localStorage.getItem('token')}`,
          },
          data: { user_id: userId },
        })
          .then((res) => {
            this.setState({
              albume: res.data,
            });
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  handleSignInNameListener(event) {
    this.setState({
      signInName: event.target.value,
    });
  }

  handleSignInPassListener(event) {
    this.setState({
      signInPass: event.target.value,
    });
  }

  handleSignInListener(event) {
    event.preventDefault();
    const userIn = {
      name: this.state.signInName,
      password: this.state.signInPass,
    };
    axios({
      method: 'POST',
      url: 'https://localhost:5000/api/sign_in',
      data: { userIn },
    })
      .then((res) => {
         this.setState({
          signInName: '',
          signInPass: '',
        });
        if (res) {
          this.setState({
            token: res.data.token,
            userId: res.data.id,
          });
        }
        localStorage.setItem('token', this.state.token);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleLogoutListener(event) {
    localStorage.removeItem('token');
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <Header
            handleAlbumeListen={this.handleAlbumeListener}
            handleNavListen={this.handleNavListener}
            checker={this.state.checker}
            userId={this.state.userId}
            handleLogoutListener={this.handleLogoutListener}
          />
        </div>
        <Switch>
          <Route exact path="/" component={Mission} />
          <Route exact path="/mission" component={Mission} />
          <Route
            exact
            path="/rovers/curiosity"
            render={props => (
              <Rover1
                bubbles={this.state.bubbles}
                pictures={this.state.pictures}
                handleRoverDateListener={this.handleRoverDateListener}
                handleSaveListener={this.handleSaveListener}
                handleRoverListener={this.handleRoverListener}
              />
            )}
          />
          <Route
            exact
            path="/rovers/spirit"
            render={props => (
              <Rover2
                bubbles={this.state.bubbles}
                pictures={this.state.pictures}
                handleRoverDateListener={this.handleRoverDateListener}
                handleSaveListener={this.handleSaveListener}
                handleRoverListener={this.handleRoverListener}
              />
            )}
          />
          <Route
            exact
            path="/rovers/opportunity"
            render={props => (
              <Rover3
                bubbles={this.state.bubbles}
                pictures={this.state.pictures}
                handleRoverDateListener={this.handleRoverDateListener}
                handleSaveListener={this.handleSaveListener}
                handleRoverListener={this.handleRoverListener}
              />
            )}
          />
          <Route
            exact
            path="/rovers"
            render={props => (
              <Rovers
                handleRoverListener={this.handleRoverListener}
              />
            )}
          />
          <Route
            exact
            path="/sign_in"
            render={props => (
              <SignIn
                nameSignInValue={this.state.signInName}
                passSignInValue={this.state.signInPass}
                handleSignInNameListen={this.handleSignInNameListener}
                handleSignInPassListen={this.handleSignInPassListener}
                handleSignInListen={this.handleSignInListener}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={props => (
              <LoginForm
                handleLoginListen={this.handleLoginListener}
                nameValue={this.state.user_name}
                handleNameListen={this.handleNameListener}
                passValue={this.state.password}
                handlePassListen={this.handlePassListener}
                emailValue={this.state.email}
                handlEmailListen={this.handlEmailListener}
              />
            )}
          />
          <Route
            exact
            path="/storage"
            render={props => (
              <Storage
                bubbles={this.state.bubbles}
                albume={this.state.albume}
                handleDeleteListener={this.handleDeleteListener}
              />
            )}
          />
        </Switch>
        <div className="footer">
          <Footer timeOver={this.state.currentTime} />
        </div>
      </div>
    );
  }
}

export default App;
