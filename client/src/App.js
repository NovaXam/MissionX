import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Loading from './components/partials/Loading';
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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: undefined,
      user_name: undefined,
      email: undefined,
      pictures: [],
      albume: [],
      currentTime: '',
      flag: 0,
      prevObj: '',
      nextObj: '',
      signInName: '',
      signInPass: '',
      token: '',
      userId: '',
      key: '',
      date: new Date(),
      bubbles: 'bubbles',
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
    this.handleCurDateListener = this.handleCurDateListener.bind(this);
    this.handleSpiDateListener = this.handleSpiDateListener.bind(this);
    this.handleOppDateListener = this.handleOppDateListener.bind(this);
  }

  componentWillMount() {
    this.setState({
      currentTime: this.countDown(),
    });
  }

  componentDidMount() {
    setInterval(this.countDown, 1000);
    this.setState({
      bubbles: '',
    })
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

  changePicStat(prop, response) {
    const keyObj = {};
    keyObj[prop] = response;
    this.setState(keyObj);
  }

  async getKeys(elem) {
    let keyApi;
    let resultApi;
    if (elem) {
      console.log('key is here');
    } else {
      try {
        keyApi = await axios('http://localhost:3001/api/info');
      } catch (err) {
        console.log(err);
      }
      resultApi = await this.changePicStat('key', keyApi.data.data.key);
    }
  }

  urlReturn() {
    return window.location.pathname.split('/')[2];
  }


  // universal listener for bacis api request when you get into the pages
  // of each rover. Method makes prior request to local server
  // for api key in case if it wasn't priory instanciated.
  async handleRoverListener(event) {
    console.log(event.target);
    let keys;
    let roverName;
    let dataApi;
    try {
      keys = await this.getKeys(this.state.key);
      console.log(this.state.key);
      roverName = await this.urlReturn();
      console.log(roverName);
      dataApi = await axios(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=1000&api_key=${this.state.key}`);
    } catch(err) {
        console.log(err);
    }
     this.changePicStat('pictures', dataApi.data.photos);
  }

  handleCurDateListener(date) {
    const transDate = date.toISOString().split('T')[0];
    this.setState({
      date: transDate,
    });
     axios({
      method: 'GET',
      url: 'http://localhost:3001/api/info',
    })
      .then((res) => {
        console.log(this.state.date);
        this.setState({
          key: res.data.data.key,
        });
    axios({
      method: 'GET',
      url: `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${this.state.date}&api_key=${this.state.key}`,
  })
    .then((response) => {
            this.setState({
              pictures: response.data.photos,
            });
          }).catch((err) => {
            console.log(err);
          });
      }).catch((err) => {
        console.log(err);
      });
  }

  handleSpiDateListener(date) {
    const transDate = date.toISOString().split('T')[0];
    this.setState({
      date: transDate,
    });
     axios({
      method: 'GET',
      url: 'http://localhost:3001/api/info',
    })
      .then((res) => {
        console.log(this.state.date);
        this.setState({
          key: res.data.data.key,
        });
    axios({
      method: 'GET',
      url: `https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?earth_date=${this.state.date}&api_key=${this.state.key}`,
  })
    .then((response) => {
            this.setState({
              pictures: response.data.photos,
            });
          }).catch((err) => {
            console.log(err);
          });
      }).catch((err) => {
        console.log(err);
      });
  }


  handleOppDateListener(date) {
    const transDate = date.toISOString().split('T')[0];
    this.setState({
      date: transDate,
    });
     axios({
      method: 'GET',
      url: 'http://localhost:3001/api/info',
    })
      .then((res) => {
        console.log(this.state.date);
        this.setState({
          key: res.data.data.key,
        });
    axios({
      method: 'GET',
      url: `https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?earth_date=${this.state.date}&api_key=${this.state.key}`,
  })
    .then((response) => {
            this.setState({
              pictures: response.data.photos,
            });
          }).catch((err) => {
            console.log(err);
          });
      }).catch((err) => {
        console.log(err);
      });
  }

  handleSaveListener(event) {
    event.preventDefault();
    const index = event.target.getAttribute('photo_id');
    const newElem = this.state.pictures.filter((elem) => {
      if (elem.id == index) {
        return elem;
      }
    });
    axios({
      method: 'POST',
      url: 'http://localhost:3001/api/rovers',
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
        if (res.data === "err") {
            alert('this item already exist');
        } else {
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
    axios({
      method: 'POST',
      url: 'http://localhost:3001/api/registration',
      data: {
        name: this.state.user_name,
        password: this.state.password,
        email: this.state.email,
      },
    })
      .then((res) => {
        this.setState({
          user_name: '',
          password: '',
          email: '',
        });
        alert('Welcome to Mars');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleAlbumeListener() {
    const id = this.state.userId;
    axios({
      method: 'POST',
      url: 'http://localhost:3001/api/storage',
      headers: {
        authorization: `JWT ${localStorage.getItem('token')}`,
      },
      data: { user_id: id },
    })
      .then((res) => {
        if (res.data === 'empty' || res.data.message === 'Please login') {
          this.setState({
            albume: [],
          });
        } else {
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
    const indexId = event.target.getAttribute('photo_id');
    const userId = event.target.getAttribute('user_id');
    axios({
      method: 'DELETE',
      url: 'http://localhost:3001/api/storage',
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
          url: 'http://localhost:3001/api/storage',
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
      url: 'http://localhost:3001/api/sign_in',
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

  render() {
    return (
      <div className="App">
        <div className="header">
          <Header
            handleAlbumeListen={this.handleAlbumeListener}
            handleNavListen={this.handleNavListener}
          />
        </div>
        <Switch>
          <Route exact path="/mission" component={Mission} />
          <Route
            exact
            path="/rovers/curiosity"
            render={props => (
              <Rover1
                bubbles={this.state.bubbles}
                pictures={this.state.pictures}
                handleCurDateListen={this.handleCurDateListener}
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
                handleSpiDateListen={this.handleSpiDateListener}
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
                handleOppDateListen={this.handleOppDateListener}
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
                // handleSpiListen={this.handleSpiListener}
                // handleOppListen={this.handleOppListener}
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
