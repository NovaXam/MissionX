import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = (props) => {

  return (
    <div className="Nav">
      <form onClick={props.handleNavListen}>
        <ul>
          <li id="nav1"><Link to="/mission">Mission</Link></li>
          <li id="nav2"><Link to="/rovers">Rovers</Link></li>
          <li id="nav3"><Link to="/login">Login</Link></li>
          <li id="nav4"><Link to="/storage" onClick={props.handleAlbumeListen}>Albume</Link></li>
        </ul>
      </form>
    </div>
  );
};
export default Navigation;
