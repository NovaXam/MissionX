import React from 'react';
import Navigation from './Navigation';
import {Link} from 'react-router-dom';
import './Header.css';
import Logo from '../../assets/total-recall.png';

const Header = (props) => {
  return (
    <div className="header">
      <Link to="/mission"><img className="logo" src={Logo} alt="roverpicture" /></Link>
      <div className="nav">
        <Navigation
          handleAlbumeListen={props.handleAlbumeListen}
          handleNavListen={props.handleNavListen}
          />
      </div>
    </div>
  );
};

export default Header;
