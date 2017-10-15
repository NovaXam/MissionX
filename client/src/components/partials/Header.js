import React from 'react';
import Navigation from './Navigation';
import './Header.css';
import Logo from '../../assets/total-recall.png';

const Header = (props) => {
  return (
    <div className="header">
      <img className="logo" src={Logo} alt="roverpicture" />
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
