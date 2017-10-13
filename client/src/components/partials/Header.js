import React from 'react';
import Navigation from './Navigation';
import './Header.css';

const Header = (props) => {
  return (
    <div className="header">
      <img className="logo" src="http://vignette2.wikia.nocookie.net/logopedia/images/2/2c/Total_recall_logo_original.png/revision/latest?cb=20120901153737" alt="roverpicture" />
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
