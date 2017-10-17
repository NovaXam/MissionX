import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import './Header.css';
import Logo from '../../assets/total-recall.png';
import Logout from './Logout';

// component contains a navigation menu. Nested components have a props to control
// a navigation emphasizing effects and AlbumeListener to show a user album if
// user is logged in.
const Header = (props) => {
  return (
    <div className="header">
      <Link to="/mission"><img className="logo" src={Logo} alt="roverpicture" /></Link>
      <div className="nav">
        <Navigation
          handleAlbumeListen={props.handleAlbumeListen}
          handleNavListen={props.handleNavListen}
          />
          <form onClick={props.handleLogoutListener}>
            <Logout visible={props.checker} />
          </form>
      </div>
    </div>
  );
};

export default Header;
